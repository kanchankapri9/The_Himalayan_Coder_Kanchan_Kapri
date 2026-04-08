import { Typography } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './InfoCard.css'

function InfoCard({ icon, title, description }) {
  return (
    <div className="info-card">
      <div className="info-card__icon">
        <FontAwesomeIcon icon={icon} />
      </div>
      <Typography variant="h3" className="info-card__title">
        {title}
      </Typography>
      <Typography className="info-card__description">{description}</Typography>
    </div>
  )
}

export default InfoCard
