import { Link, useNavigate } from 'react-router-dom'
import { Button, Stack, Typography } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../context/AuthContext'
import { useSavedEvents } from '../../context/SavedEventsContext'
import './EventCard.css'

function EventCard({ event, id, image, date, title, location, price }) {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { isSaved, toggleSavedEvent } = useSavedEvents()
  const saved = isSaved(id)

  const handleRegister = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/events/${id}` } })
      return
    }

    navigate(`/events/${id}`)
  }

  const handleSave = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/events/${id}` } })
      return
    }

    toggleSavedEvent(event)
  }

  return (
    <article className="event-card">
      <Link to={`/events/${id}`} className="event-card__overlay-link" aria-label={`Open details for ${title}`} />

      <div className="event-card__image" style={{ backgroundImage: `url(${image})` }} />
      <div className="event-card__body">
        <Typography className="event-card__date">
          <FontAwesomeIcon icon={faCalendarDays} /> {date}
        </Typography>
        <Typography variant="h3" className="event-card__title">
          {title}
        </Typography>
        <Typography className="event-card__location">
          <FontAwesomeIcon icon={faLocationDot} /> {location}
        </Typography>
        <Typography className="event-card__price">{price}</Typography>

        <Stack direction="row" spacing={1} className="event-card__actions">
          <Button variant="contained" onClick={handleRegister} className="event-card__button">
            Register
          </Button>
          <Button variant="text" onClick={handleSave} className="event-card__link-button">
            {saved ? 'Saved' : 'Save'}
          </Button>
        </Stack>
      </div>
    </article>
  )
}

export default EventCard
