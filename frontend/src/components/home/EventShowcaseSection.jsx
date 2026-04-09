import Grid from '@mui/material/Grid'
import SectionHeader from './SectionHeader'
import EventCard from './EventCard'
import { events } from '../../data/events'
import './EventShowcaseSection.css'

function EventShowcaseSection({ label, title, compact = false }) {
  return (
    <section className={compact ? 'event-showcase event-showcase--compact' : 'event-showcase'}>
      <SectionHeader label={label} title={title} />
      <Grid container spacing={2}>
        {events.map((event) => (
          <Grid key={`${title}-${event.title}`} size={{ xs: 12, sm: 6, lg: 3 }}>
<<<<<<< Updated upstream
            <EventCard {...event} />
=======
            <EventCard event={event} {...mapEventForCard(event)} />
>>>>>>> Stashed changes
          </Grid>
        ))}
      </Grid>
    </section>
  )
}

export default EventShowcaseSection
