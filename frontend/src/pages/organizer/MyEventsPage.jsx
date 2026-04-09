import { Typography } from '@mui/material'
import OrganizerShell from '../../components/organizer/OrganizerShell'
import OrganizerSummaryCards from '../../components/organizer/OrganizerSummaryCards'
import OrganizerEventCard from '../../components/organizer/OrganizerEventCard'
import {
  getMockOrganizerEvents,
  getOrganizerSummary,
  mapOrganizerEventForCard,
} from '../../data/organizer'
import './OrganizerPages.css'

function MyEventsPage() {
  const events = getMockOrganizerEvents()
  const summaryItems = getOrganizerSummary(events)
  const eventCards = events.map((event) => mapOrganizerEventForCard(event))

  return (
    <OrganizerShell
      eyebrow="Organizer Dashboard"
      title="My events"
      description="Review all the events you are running, compare performance quickly, and jump into management screens without switching context."
    >
      <div className="organizer-page">
        <OrganizerSummaryCards items={summaryItems} />

        {eventCards.length ? (
          <div className="organizer-page__section">
            {eventCards.map((event) => (
              <OrganizerEventCard
                key={event.id}
                image={event.image}
                title={event.title}
                category={event.category}
                date={event.date}
                location={event.location}
                status={event.status}
                registrations={event.registrations}
                pendingApprovals={event.pendingApprovals}
                revenue={event.revenue}
                manageTo={`/organizer/events/${event.id}`}
              />
            ))}
          </div>
        ) : (
          <div className="organizer-page__empty">
            <Typography className="organizer-page__empty-title">No organizer events yet</Typography>
            <Typography className="organizer-page__empty-text">
              Once you create your first event, it will show up here with registration counts, publishing state, and quick management actions.
            </Typography>
          </div>
        )}
      </div>
    </OrganizerShell>
  )
}

export default MyEventsPage
