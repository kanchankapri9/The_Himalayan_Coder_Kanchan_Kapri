import { Link } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import './OrganizerBanner.css'

function OrganizerBanner() {
  return (
    <section className="organizer-banner">
      <div>
        <Typography className="organizer-banner__label">For organizers</Typography>
        <Typography variant="h2" className="organizer-banner__title">
          Create, promote, and manage your event with one workflow.
        </Typography>
        <Typography className="organizer-banner__text">
          Publish ticket types, approve registrations, send QR passes, and check people in
          at the gate without juggling tools.
        </Typography>
      </div>
      <Button variant="contained" component={Link} to="/register" className="organizer-banner__button">
        Start organizing
      </Button>
    </section>
  )
}

export default OrganizerBanner
