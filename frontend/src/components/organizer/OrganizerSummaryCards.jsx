import { Typography } from '@mui/material'
import './OrganizerSummaryCards.css'

function OrganizerSummaryCards({ items }) {
  return (
    <div className="organizer-summary-cards">
      {items.map((item) => (
        <article key={item.label} className="organizer-summary-card">
          <Typography className="organizer-summary-card__label">{item.label}</Typography>
          <Typography className="organizer-summary-card__value">{item.value}</Typography>
          <Typography className="organizer-summary-card__note">{item.note}</Typography>
        </article>
      ))}
    </div>
  )
}

export default OrganizerSummaryCards
