import { Link } from 'react-router-dom'
import { Button, Stack, Typography } from '@mui/material'
import './CTASection.css'

function CTASection() {
  return (
    <section className="cta-section">
      <Typography className="cta-section__label">Ready to launch local events</Typography>
      <Typography variant="h2" className="cta-section__title">
        Make FestFlow the home for your next campus crowd.
      </Typography>
      <Typography className="cta-section__description">
        Start with a simple frontend and grow it into a complete event booking experience.
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
        <Button variant="contained" component={Link} to="/register">
          Get Started
        </Button>
        <Button variant="outlined" component={Link} to="/explore" className="cta-section__secondary">
          Explore Demo Flow
        </Button>
      </Stack>
    </section>
  )
}

export default CTASection
