import { Typography } from '@mui/material'
import './SectionHeader.css'

function SectionHeader({ label, title }) {
  return (
    <div className="section-header">
      <Typography className="section-header__label">{label}</Typography>
      <Typography variant="h2" className="section-header__title">
        {title}
      </Typography>
    </div>
  )
}

export default SectionHeader
