import { Typography } from '@mui/material'
import './AttendeeSummaryCards.css'

function AttendeeSummaryCards({ items }) {
  return (
    <div className="attendee-summary-cards">
      {items.map((item) => (
        <article key={item.label} className="attendee-summary-card">
          <Typography className="attendee-summary-card__label">{item.label}</Typography>
          <Typography className="attendee-summary-card__value">{item.value}</Typography>
          <Typography className="attendee-summary-card__note">{item.note}</Typography>
        </article>
      ))}
    </div>
  )
}

export default AttendeeSummaryCards
