import Grid from '@mui/material/Grid'
import { Typography } from '@mui/material'
import SectionHeader from './SectionHeader'
import './CollectionGrid.css'

const collections = [
  {
    title: 'Best college fest drops near you',
    text: 'Fresh campus launches, headline performances, and limited early tickets.',
  },
  {
    title: 'After-class experiences worth booking',
    text: 'Find workshops, open mics, social mixers, and student community hangouts.',
  },
  {
    title: 'Small pop-ups with big local energy',
    text: 'Food, fashion, nightlife, and creative events from nearby neighborhoods.',
  },
]

function CollectionGrid() {
  return (
    <section className="collection-grid">
      <SectionHeader label="Collections" title="Ways to discover what is happening" />
      <Grid container spacing={2}>
        {collections.map((item, index) => (
          <Grid key={item.title} size={{ xs: 12, md: 4 }}>
            <div className={`collection-grid__card collection-grid__card--${index + 1}`}>
              <Typography variant="h3" className="collection-grid__title">
                {item.title}
              </Typography>
              <Typography className="collection-grid__text">{item.text}</Typography>
            </div>
          </Grid>
        ))}
      </Grid>
    </section>
  )
}

export default CollectionGrid
