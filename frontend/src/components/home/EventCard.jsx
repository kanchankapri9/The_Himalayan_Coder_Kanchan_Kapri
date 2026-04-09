import { Link } from 'react-router-dom'
import { Button, Stack, Typography } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import './EventCard.css'

function EventCard({ _id, image, date, title, location, price }) {
  return (
    <article className="event-card">
      <Link
        to={`/events/${_id}`}
        className="event-card__overlay-link"
        aria-label={`Open details for ${title}`}
      />

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
          <Button variant="contained" component={Link} to="/login" className="event-card__button">
            Register
          </Button>
          <Button variant="text" component={Link} to="/login" className="event-card__link-button">
            Save
          </Button>
        </Stack>
      </div>
    </article>
  )
}

export default EventCard
