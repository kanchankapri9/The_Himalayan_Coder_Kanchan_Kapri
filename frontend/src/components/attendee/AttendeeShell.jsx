import { Link, useLocation } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import './AttendeeShell.css'

const navItems = [
  { label: 'My Registrations', to: '/attendee/registrations' },
  { label: 'Saved Events', to: '/attendee/saved-events' },
  { label: 'My Passes', to: '/attendee/passes' },
]

function AttendeeShell({ eyebrow, title, description, children }) {
  const location = useLocation()

  return (
    <section className="attendee-shell">
      <div className="attendee-shell__hero">
        <div>
          <Typography className="attendee-shell__eyebrow">{eyebrow}</Typography>
          <Typography variant="h1" className="attendee-shell__title">
            {title}
          </Typography>
          <Typography className="attendee-shell__description">{description}</Typography>
        </div>

        <div className="attendee-shell__actions">
          <Button component={Link} to="/home" variant="contained" className="attendee-shell__primary">
            Explore events
          </Button>
          <Button component={Link} to="/explore" variant="outlined" className="attendee-shell__secondary">
            Browse more
          </Button>
        </div>
      </div>

      <div className="attendee-shell__nav">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to || location.pathname.startsWith(`${item.to}/`)

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`attendee-shell__nav-link${isActive ? ' attendee-shell__nav-link--active' : ''}`}
            >
              {item.label}
            </Link>
          )
        })}
      </div>

      <div className="attendee-shell__content">{children}</div>
    </section>
  )
}

export default AttendeeShell
