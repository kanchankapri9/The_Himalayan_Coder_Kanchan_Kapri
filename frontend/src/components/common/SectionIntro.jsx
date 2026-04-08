import { Typography } from '@mui/material'
import './SectionIntro.css'

function SectionIntro({ label, title, description, centered = false }) {
  const className = centered ? 'section-intro section-intro--centered' : 'section-intro'

  return (
    <div className={className}>
      <Typography className="section-intro__label">{label}</Typography>
      <Typography variant="h2" className="section-intro__title">
        {title}
      </Typography>
      <Typography className="section-intro__description">{description}</Typography>
    </div>
  )
}

export default SectionIntro
