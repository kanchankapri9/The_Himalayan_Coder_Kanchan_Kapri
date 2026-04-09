import { Link } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import OrganizerShell from '../../components/organizer/OrganizerShell'
import OrganizerSummaryCards from '../../components/organizer/OrganizerSummaryCards'
import OrganizerEventCard from '../../components/organizer/OrganizerEventCard'
import {
  getMockOrganizerEvents,
  getOrganizerSummary,
  mapOrganizerEventForCard,
} from '../../data/organizer'
import './OrganizerPages.css'

function OrganizerDashboardPage() {
  const events = getMockOrganizerEvents()
  const summaryItems = getOrganizerSummary(events)
  const featuredEvent = mapOrganizerEventForCard(events[0])

  return (
    <OrganizerShell
      eyebrow="Organizer Dashboard"
      title="Run your events with clarity"
      description="Track what is live, what still needs attention, and what your audience is responding to without leaving the dashboard."
    >
      <div className="organizer-page">
        <OrganizerSummaryCards items={summaryItems} />

        <div className="organizer-page__section">
          <Typography className="organizer-page__panel-title">Spotlight event</Typography>
          <OrganizerEventCard
            image={featuredEvent.image}
            title={featuredEvent.title}
            category={featuredEvent.category}
            date={featuredEvent.date}
            location={featuredEvent.location}
            status={featuredEvent.status}
            registrations={featuredEvent.registrations}
            pendingApprovals={featuredEvent.pendingApprovals}
            revenue={featuredEvent.revenue}
            manageTo={`/organizer/events/${featuredEvent.id}`}
          />
        </div>

        <div className="organizer-page__panel">
          <Typography className="organizer-page__panel-title">What to do next</Typography>
          <Typography className="organizer-page__line">
            1. Review pending approvals before your next event spike.
          </Typography>
          <Typography className="organizer-page__line">
            2. Update ticket tiers and publish the draft event waiting in your queue.
          </Typography>
          <Typography className="organizer-page__line">
            3. Prepare check-in and analytics screens in the next phase for the full organizer flow.
          </Typography>
          <Button component={Link} to="/organizer/events" variant="contained" sx={{ mt: 2 }}>
            Open my events
          </Button>
        </div>
      </div>
    </OrganizerShell>
  )
}

export default OrganizerDashboardPage
