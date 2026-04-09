import { Link } from 'react-router-dom'
import { Button, Chip, Typography } from '@mui/material'
import './AttendeeEventCard.css'

function AttendeeEventCard({
  image,
  title,
  date,
  location,
  meta,
  status,
  primaryAction,
  secondaryAction,
}) {
  return (
    <article className="attendee-event-card">
      <div className="attendee-event-card__image" style={{ backgroundImage: `url(${image})` }} />
      <div className="attendee-event-card__body">
        <div className="attendee-event-card__top">
          <div>
            <Typography variant="h3" className="attendee-event-card__title">
              {title}
            </Typography>
            <Typography className="attendee-event-card__text">{date}</Typography>
            <Typography className="attendee-event-card__text">{location}</Typography>
          </div>
          {status ? <Chip label={status.label} className={`attendee-event-card__chip attendee-event-card__chip--${status.tone}`} /> : null}
        </div>

        {meta ? <Typography className="attendee-event-card__meta">{meta}</Typography> : null}

        <div className="attendee-event-card__actions">
          {primaryAction ? (
            <Button
              component={primaryAction.to ? Link : 'button'}
              to={primaryAction.to}
              variant="contained"
              className="attendee-event-card__button"
            >
              {primaryAction.label}
            </Button>
          ) : null}

          {secondaryAction ? (
            <Button
              component={secondaryAction.to ? Link : 'button'}
              to={secondaryAction.to}
              variant="text"
              className="attendee-event-card__link"
            >
              {secondaryAction.label}
            </Button>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export default AttendeeEventCard
