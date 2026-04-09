import { Button, Typography } from '@mui/material'
import './PassHeroCard.css'

function PassHeroCard({ pass, onAddToCalendar }) {
  return (
    <section className="pass-hero-card">
      <div className="pass-hero-card__content">
        <Typography className="pass-hero-card__eyebrow">{pass.category}</Typography>
        <Typography variant="h1" className="pass-hero-card__title">
          {pass.title}
        </Typography>
        <Typography className="pass-hero-card__meta">{pass.startDate}</Typography>
        <Typography className="pass-hero-card__meta">{pass.location}</Typography>
        <Typography className="pass-hero-card__meta">
          Pass No. {pass.passNumber} • Registration {pass.registrationNumber}
        </Typography>

        <div className="pass-hero-card__actions">
          <Button variant="contained" className="pass-hero-card__button">
            Download pass
          </Button>
          <Button variant="outlined" className="pass-hero-card__button" onClick={onAddToCalendar}>
            Add to calendar
          </Button>
        </div>
      </div>

      <div className="pass-hero-card__qr-box">
        <Typography className="pass-hero-card__qr-label">Entry QR</Typography>
        <div className="pass-hero-card__qr-code">{pass.qrCode}</div>
        <Typography className="pass-hero-card__status">Status: {pass.status}</Typography>
      </div>
    </section>
  )
}

export default PassHeroCard
