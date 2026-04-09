import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Alert, Button, CircularProgress, Divider, Stack, Typography } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarDays,
  faLocationDot,
  faTicket,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons'
import { fetchEventById } from '../../api/eventApi'
import { createRegistration } from '../../api/registrationApi'
import { fetchTickets } from '../../api/ticketApi'
import { useAuth } from '../../context/AuthContext'
import { getEventById, getTicketsByEventId, mapEventForDetails } from '../../data/events'
import { getApiErrorMessage } from '../../utils/apiError'
import './EventPage.css'

function EventPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()
  const { isAuthenticated, user } = useAuth()
  const [rawEvent, setRawEvent] = useState(null)
  const [eventTickets, setEventTickets] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [actionMessage, setActionMessage] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [selectedTicketId, setSelectedTicketId] = useState('')
  const [bookingSuccess, setBookingSuccess] = useState(null)

  useEffect(() => {
    const loadEventPageData = async () => {
      try {
        setIsLoading(true)

        const [eventResponse, ticketResponse] = await Promise.all([fetchEventById(id), fetchTickets()])
        const matchedTickets = (ticketResponse.data || []).filter((ticket) => {
          const ticketEventId = typeof ticket.event === 'string' ? ticket.event : ticket.event?._id
          return ticketEventId === id
        })

        setRawEvent(eventResponse.data)
        setEventTickets(matchedTickets)
        setSelectedTicketId((current) => current || matchedTickets[0]?._id || '')
        setErrorMessage('')
      } catch (error) {
        const fallbackEvent = getEventById(id)

        if (fallbackEvent) {
          const fallbackTickets = getTicketsByEventId(id)
          setRawEvent(fallbackEvent)
          setEventTickets(fallbackTickets)
          setSelectedTicketId((current) => current || fallbackTickets[0]?._id || '')
          setErrorMessage(
            `${getApiErrorMessage(error, 'Could not load the live event details right now.')} Showing demo event data instead.`,
          )
        } else {
          setRawEvent(null)
          setEventTickets([])
          setErrorMessage(getApiErrorMessage(error, 'Could not load this event right now.'))
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadEventPageData()
  }, [id])

  const event = useMemo(() => {
    if (!rawEvent) {
      return null
    }

    return mapEventForDetails(rawEvent, eventTickets)
  }, [rawEvent, eventTickets])

  const selectedTicket = useMemo(() => {
    if (!eventTickets.length) {
      return null
    }

    return eventTickets.find((ticket) => ticket._id === selectedTicketId) || eventTickets[0]
  }, [eventTickets, selectedTicketId])

  const handleRegister = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } })
      return
    }

    if (!selectedTicket) {
      setActionMessage('No tickets are available for this event yet.')
      return
    }

    const registrationNumber = `REG-${Date.now()}`

    try {
      setIsRegistering(true)
      setActionMessage('')

      await createRegistration({
        event: rawEvent._id,
        ticketType: selectedTicket._id,
        registrationNumber,
        amount: selectedTicket.price,
        quantity: 1,
        currency: selectedTicket.currency || 'INR',
        attendeeDetails: {
          fullName: user?.name,
          email: user?.email,
          phone: user?.phone,
          college: user?.college,
        },
      })

      setBookingSuccess({
        title: rawEvent.title,
        registrationNumber,
        ticketName: selectedTicket.name,
      })
      setActionMessage('Registration created successfully. Your booking is now recorded in the backend.')
    } catch (error) {
      setActionMessage(error.response?.data?.message || 'Failed to create registration.')
    } finally {
      setIsRegistering(false)
    }
  }

  if (isLoading && !event) {
    return <CircularProgress />
  }

  if (!event) {
    return (
      <section className="event-page event-page--empty">
        <Typography variant="h2">Event not found</Typography>
        <Typography className="event-page__empty-text">
          The event you are looking for is not available right now.
        </Typography>
        <Button component={Link} to="/home" variant="contained">
          Back to Home
        </Button>
      </section>
    )
  }

  return (
    <section className="event-page">
      {errorMessage ? <Alert severity="warning">{errorMessage}</Alert> : null}
      {actionMessage ? (
        <Alert severity={actionMessage.includes('successfully') ? 'success' : 'info'}>{actionMessage}</Alert>
      ) : null}

      {bookingSuccess ? (
        <div className="event-page__success-card">
          <div>
            <Typography className="event-page__success-title">Booking confirmed for {bookingSuccess.title}</Typography>
            <Typography className="event-page__success-text">
              Registration {bookingSuccess.registrationNumber} is recorded with the selected {bookingSuccess.ticketName}.
              You can now track it from your attendee dashboard.
            </Typography>
          </div>
          <div className="event-page__success-actions">
            <Button component={Link} to="/attendee/registrations" variant="contained">
              My registrations
            </Button>
            <Button component={Link} to="/attendee/passes" variant="outlined">
              View passes
            </Button>
          </div>
        </div>
      ) : null}

      <div className="event-page__hero">
        <div className="event-page__hero-image" style={{ backgroundImage: `url(${event.image})` }} />
        <div className="event-page__hero-overlay" />
        <div className="event-page__hero-content">
          <Typography className="event-page__category">{event.category}</Typography>
          <Typography variant="h1" className="event-page__title">
            {event.title}
          </Typography>
          <Typography className="event-page__hero-meta">
            <FontAwesomeIcon icon={faCalendarDays} /> {event.date}
          </Typography>
          <Typography className="event-page__hero-meta">
            <FontAwesomeIcon icon={faLocationDot} /> {event.venue}
          </Typography>
          <Typography className="event-page__hero-meta">
            <FontAwesomeIcon icon={faUserGroup} /> By {event.organizerName}
          </Typography>
        </div>
      </div>

      <div className="event-page__content">
        <div className="event-page__main">
          <div className="event-page__section">
            <Typography variant="h2" className="event-page__section-title">
              About this event
            </Typography>
            <Typography className="event-page__body-text">{event.about}</Typography>
            <Typography className="event-page__body-text">
              FestFlow event pages are built to help attendees understand the vibe, timing, venue, and ticket structure clearly before they register.
            </Typography>
          </div>

          <Divider className="event-page__divider" />

          <div className="event-page__section">
            <Typography variant="h2" className="event-page__section-title">
              What to expect
            </Typography>
            <ul className="event-page__list">
              {event.details.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <Divider className="event-page__divider" />

          <div className="event-page__section">
            <Typography variant="h2" className="event-page__section-title">
              Date and location
            </Typography>
            <div className="event-page__info-card">
              <Typography className="event-page__info-line">
                <FontAwesomeIcon icon={faCalendarDays} /> {event.date}
              </Typography>
              <Typography className="event-page__info-line">
                <FontAwesomeIcon icon={faLocationDot} /> {event.venue}
              </Typography>
            </div>
          </div>

          <Divider className="event-page__divider" />

          <div className="event-page__section">
            <Typography variant="h2" className="event-page__section-title">
              Organizer
            </Typography>
            <div className="event-page__organizer-card">
              <div className="event-page__organizer-avatar">{event.organizerName.charAt(0)}</div>
              <div>
                <Typography className="event-page__organizer-name">{event.organizerName}</Typography>
                <Typography className="event-page__organizer-meta">
                  {event.attendees} • Event by local campus team
                </Typography>
              </div>
            </div>
          </div>
        </div>

        <aside className="event-page__sidebar">
          <div className="event-page__ticket-card">
            <Typography className="event-page__ticket-label">
              <FontAwesomeIcon icon={faTicket} /> Tickets
            </Typography>
            <Typography variant="h3" className="event-page__ticket-price">
              {selectedTicket ? (selectedTicket.price === 0 ? 'Free' : `Rs. ${selectedTicket.price}`) : event.price}
            </Typography>
            <Typography className="event-page__ticket-note">
              Pick the ticket that matches the experience you want, then continue with registration. Your QR pass will appear after confirmation.
            </Typography>

            <Stack spacing={1.1} className="event-page__ticket-list">
              {event.tickets.map((ticket) => (
                <button
                  type="button"
                  key={ticket.id || ticket.name}
                  className={`event-page__ticket-row${selectedTicket?._id === ticket.id ? ' event-page__ticket-row--active' : ''}`}
                  onClick={() => setSelectedTicketId(ticket.id)}
                >
                  <div>
                    <Typography className="event-page__ticket-name">{ticket.name}</Typography>
                    <Typography className="event-page__ticket-subtext">{ticket.note}</Typography>
                  </div>
                  <Typography className="event-page__ticket-amount">{ticket.price}</Typography>
                </button>
              ))}
            </Stack>

            {selectedTicket ? (
              <div className="event-page__selected-ticket">
                <Typography className="event-page__selected-label">Selected ticket</Typography>
                <Typography className="event-page__selected-name">{selectedTicket.name}</Typography>
                <Typography className="event-page__selected-text">
                  {selectedTicket.description || 'Ticket details will be shared after booking confirmation.'}
                </Typography>
              </div>
            ) : null}

            <Button
              onClick={handleRegister}
              variant="contained"
              className="event-page__primary-button"
              disabled={isRegistering}
            >
              {selectedTicket ? `Register for ${selectedTicket.name}` : 'Register now'}
            </Button>
            <Button component={Link} to="/register" variant="outlined" className="event-page__secondary-button">
              Create account
            </Button>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default EventPage
