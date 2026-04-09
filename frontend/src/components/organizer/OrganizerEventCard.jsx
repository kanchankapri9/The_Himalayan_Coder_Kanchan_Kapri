import { Link } from 'react-router-dom'
import { Button, Chip, Typography } from '@mui/material'
import './OrganizerEventCard.css'

function OrganizerEventCard({
  image,
  title,
  category,
  date,
  location,
  status,
  registrations,
  pendingApprovals,
  revenue,
  manageTo,
}) {
  return (
    <article className="organizer-event-card">
      <div className="organizer-event-card__image" style={{ backgroundImage: `url(${image})` }} />
      <div className="organizer-event-card__body">
        <div className="organizer-event-card__top">
          <div>
            <Typography className="organizer-event-card__category">{category}</Typography>
            <Typography variant="h3" className="organizer-event-card__title">
              {title}
            </Typography>
            <Typography className="organizer-event-card__text">{date}</Typography>
            <Typography className="organizer-event-card__text">{location}</Typography>
          </div>
          <Chip
            label={status}
            className={`organizer-event-card__chip organizer-event-card__chip--${status === 'published' ? 'success' : 'neutral'}`}
          />
        </div>

        <div className="organizer-event-card__stats">
          <div>
            <Typography className="organizer-event-card__stat-label">Registrations</Typography>
            <Typography className="organizer-event-card__stat-value">{registrations}</Typography>
          </div>
          <div>
            <Typography className="organizer-event-card__stat-label">Pending</Typography>
            <Typography className="organizer-event-card__stat-value">{pendingApprovals}</Typography>
          </div>
          <div>
            <Typography className="organizer-event-card__stat-label">Revenue</Typography>
            <Typography className="organizer-event-card__stat-value">{revenue}</Typography>
          </div>
        </div>

        <div className="organizer-event-card__actions">
          <Button component={Link} to={manageTo} variant="contained" className="organizer-event-card__button">
            Manage event
          </Button>
          <Button component={Link} to={manageTo} variant="text" className="organizer-event-card__link">
            View details
          </Button>
        </div>
      </div>
    </article>
  )
}

export default OrganizerEventCard
