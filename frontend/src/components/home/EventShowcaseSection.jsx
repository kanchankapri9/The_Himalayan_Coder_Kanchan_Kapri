import Grid from '@mui/material/Grid'
import SectionHeader from './SectionHeader'
import EventCard from './EventCard'
import { events, mapEventForCard } from '../../data/events'
import './EventShowcaseSection.css'

function EventShowcaseSection({ label, title, compact = false, items = events }) {
  const safeItems = Array.isArray(items) ? items : []

  return (
    <section className={compact ? 'event-showcase event-showcase--compact' : 'event-showcase'}>
      <SectionHeader label={label} title={title} />
      <Grid container spacing={2}>
        {safeItems.map((event) => (
          <Grid key={`${title}-${event.title}`} size={{ xs: 12, sm: 6, lg: 3 }}>
            <EventCard {...mapEventForCard(event)} />
          </Grid>
        ))}
      </Grid>
    </section>
  )
}

export default EventShowcaseSection
