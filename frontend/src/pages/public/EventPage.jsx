import { Link, useParams } from 'react-router-dom'
import { Button, Divider, Stack, Typography } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarDays,
  faLocationDot,
  faUserGroup,
  faTicket,
} from '@fortawesome/free-solid-svg-icons'
import { getEventBySlug } from '../../data/events'
import './EventPage.css'

function EventPage() {
  const { slug } = useParams()
  const event = getEventBySlug(slug)

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
            <FontAwesomeIcon icon={faUserGroup} /> By {event.organizer}
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
              <div className="event-page__organizer-avatar">{event.organizer.charAt(0)}</div>
              <div>
                <Typography className="event-page__organizer-name">{event.organizer}</Typography>
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

            <Button component={Link} to="/login" variant="contained" className="event-page__primary-button">
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
