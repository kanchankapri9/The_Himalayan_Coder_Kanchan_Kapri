import { Link } from 'react-router-dom'
import { Button, Chip, Stack, Typography } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faCalendarDays, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import './HeroSection.css'

function HeroSection() {
  return (
    <section className="landing-hero">
      <div className="landing-hero__overlay" />
      <div className="landing-hero__content">
        <Chip
          icon={<FontAwesomeIcon icon={faLocationDot} />}
          label="Campus events, local pop-ups, and community nights"
          className="landing-hero__chip"
        />

        <Typography className="landing-hero__meta">
          <FontAwesomeIcon icon={faCalendarDays} /> DELHI, MUMBAI, BANGALORE AND MORE
        </Typography>

        <Typography variant="h1" className="landing-hero__title">
          FIND THE FEST.
          <br />
          BOOK THE PASS.
          <br />
          OWN THE CROWD.
        </Typography>

        <Typography className="landing-hero__description">
          FestFlow is a hyper-local event platform where students discover nearby college
          fests, book tickets, receive QR passes, and organizers manage registrations,
          approvals, and attendance from one simple dashboard.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} className="landing-hero__actions">
          <Button variant="contained" component={Link} to="/explore" endIcon={<FontAwesomeIcon icon={faArrowRight} />}>
            Explore Events
          </Button>
          <Button variant="outlined" component={Link} to="/register" className="landing-hero__secondary">
            Get Started
          </Button>
        </Stack>
      </div>
    </section>
  )
}

export default HeroSection
