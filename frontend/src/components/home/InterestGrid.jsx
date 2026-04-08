import Grid from '@mui/material/Grid'
import { Typography } from '@mui/material'
import SectionHeader from './SectionHeader'
import './InterestGrid.css'

const interestItems = [
  'College fests and cultural nights',
  'Startup events and networking sessions',
  'Comedy, live music, and open mics',
  'Food trails and local pop-ups',
  'Skill workshops and hackathons',
  'Clubs, communities, and youth meetups',
]

function InterestGrid() {
  return (
    <section className="interest-grid">
      <SectionHeader label="Browse by interest" title="What do you want to do this week?" />
      <Grid container spacing={2}>
        {interestItems.map((item) => (
          <Grid key={item} size={{ xs: 12, sm: 6, md: 4 }}>
            <div className="interest-grid__item">
              <Typography>{item}</Typography>
            </div>
          </Grid>
        ))}
      </Grid>
    </section>
  )
}

export default InterestGrid
