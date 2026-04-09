import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Alert, Button, CircularProgress, Divider, Stack, Typography } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarDays,
  faLocationDot,
  faUserGroup,
  faTicket,
} from '@fortawesome/free-solid-svg-icons'
import { fetchEventById } from '../../api/eventApi'
import { createRegistration } from '../../api/registrationApi'
import { fetchTickets } from '../../api/ticketApi'
import { useAuth } from '../../context/AuthContext'
import { getEventById, getTicketsByEventId, mapEventForDetails } from '../../data/events'
import './EventPage.css'

function EventPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()
  const { isAuthenticated, user } = useAuth()
  const [rawEvent, setRawEvent] = useState(getEventById(id))
  const [eventTickets, setEventTickets] = useState(getTicketsByEventId(id))
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [actionMessage, setActionMessage] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)

  useEffect(() => {
    const loadEventPageData = async () => {
      try {
        setIsLoading(true)

        const [eventResponse, ticketResponse] = await Promise.all([
          fetchEventById(id),
          fetchTickets(),
        ])

        setRawEvent(eventResponse.data)
        const matchedTickets = (ticketResponse.data || []).filter((ticket) => {
          const ticketEventId =
            typeof ticket.event === 'string' ? ticket.event : ticket.event?._id

          return ticketEventId === id
        })
        setEventTickets(matchedTickets)
        setErrorMessage('')
      } catch (error) {
        setRawEvent(getEventById(id))
        setEventTickets(getTicketsByEventId(id))
        setErrorMessage(error.response?.data?.message || 'Using fallback event data because the API is unavailable.')
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

  const handleRegister = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } })
      return
    }

    if (!eventTickets.length) {
      setActionMessage('No tickets are available for this event yet.')
      return
    }

    const selectedTicket = eventTickets[0]
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

      setActionMessage('Registration created successfully. Your booking is now recorded in the backend.')
    } catch (error) {
      setActionMessage(error.response?.data?.message || 'Failed to create registration.')
    } finally {
      setIsRegistering(false)
    }
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
      {errorMessage && <Alert severity="warning">{errorMessage}</Alert>}
      {actionMessage && <Alert severity={actionMessage.includes('successfully') ? 'success' : 'info'}>{actionMessage}</Alert>}
      {isLoading && <CircularProgress />}
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
              FestFlow event pages are built to help attendees understand the vibe,
              timing, venue, and ticket structure clearly before they register.
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
              {event.price}
            </Typography>
            <Typography className="event-page__ticket-note">
              Reserve your seat and get your QR pass after login and registration.
            </Typography>

            <Stack spacing={1.1} className="event-page__ticket-list">
              {event.tickets.map((ticket) => (
                <div key={ticket.name} className="event-page__ticket-row">
                  <div>
                    <Typography className="event-page__ticket-name">{ticket.name}</Typography>
                    <Typography className="event-page__ticket-subtext">{ticket.note}</Typography>
                  </div>
                  <Typography className="event-page__ticket-amount">{ticket.price}</Typography>
                </div>
              ))}
            </Stack>

            <Button
              onClick={handleRegister}
              variant="contained"
              className="event-page__primary-button"
              disabled={isRegistering}
            >
              Register now
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
