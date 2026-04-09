import { useEffect, useMemo, useState } from 'react'
import { Alert, CircularProgress, Typography } from '@mui/material'
import OrganizerShell from '../../components/organizer/OrganizerShell'
import OrganizerSummaryCards from '../../components/organizer/OrganizerSummaryCards'
import OrganizerEventCard from '../../components/organizer/OrganizerEventCard'
import { getMyEvents } from '../../api/organizerApi'
import { getApiErrorMessage } from '../../utils/apiError'
import {
  getMockOrganizerEvents,
  getOrganizerSummary,
  mapOrganizerEventForCard,
} from '../../data/organizer'
import './OrganizerPages.css'

function MyEventsPage() {
  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setIsLoading(true)
        const response = await getMyEvents()
        setEvents(response.data || [])
        setErrorMessage('')
      } catch (error) {
        setEvents(getMockOrganizerEvents())
        setErrorMessage(
          `${getApiErrorMessage(error, 'Could not load your live events right now.')} Showing demo event data instead.`,
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadEvents()
  }, [])

  const summaryItems = useMemo(() => getOrganizerSummary(events), [events])
  const eventCards = useMemo(() => events.map((event) => mapOrganizerEventForCard(event)), [events])

  return (
    <OrganizerShell
      eyebrow="Organizer Dashboard"
      title="My events"
      description="Review all the events you are running, compare performance quickly, and jump into management screens without switching context."
    >
      <div className="organizer-page">
        {errorMessage ? <Alert severity="warning" className="organizer-page__feedback">{errorMessage}</Alert> : null}

        <OrganizerSummaryCards items={summaryItems} />

        {isLoading && !eventCards.length ? <CircularProgress /> : null}

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
