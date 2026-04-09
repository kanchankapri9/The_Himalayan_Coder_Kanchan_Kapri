import { Link, useLocation } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import './OrganizerShell.css'

const navItems = [
  { label: 'Dashboard', to: '/organizer' },
  { label: 'My Events', to: '/organizer/events' },
  { label: 'Create Event', to: '/organizer/events/create' },
]

function OrganizerShell({ eyebrow, title, description, children }) {
  const location = useLocation()

  return (
    <section className="organizer-shell">
      <div className="organizer-shell__hero">
        <div>
          <Typography className="organizer-shell__eyebrow">{eyebrow}</Typography>
          <Typography variant="h1" className="organizer-shell__title">
            {title}
          </Typography>
          <Typography className="organizer-shell__description">{description}</Typography>
        </div>

        <div className="organizer-shell__actions">
          <Button component={Link} to="/organizer/events/create" variant="contained" className="organizer-shell__primary">
            Create new event
          </Button>
          <Button component={Link} to="/home" variant="outlined" className="organizer-shell__secondary">
            View public home
          </Button>
        </div>
      </div>

      <div className="organizer-shell__nav">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to || location.pathname.startsWith(`${item.to}/`)

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`organizer-shell__nav-link${isActive ? ' organizer-shell__nav-link--active' : ''}`}
            >
              {item.label}
            </Link>
          )
        })}
      </div>

      <div className="organizer-shell__content">{children}</div>
    </section>
  )
}

export default OrganizerShell
