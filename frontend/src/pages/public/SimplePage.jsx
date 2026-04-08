import { Typography } from '@mui/material'
import './SimplePage.css'

function SimplePage({ title, description }) {
  return (
    <section className="simple-page">
      <Typography variant="h2" className="simple-page__title">
        {title}
      </Typography>
      <Typography className="simple-page__description">{description}</Typography>
    </section>
  )
}

export default SimplePage
