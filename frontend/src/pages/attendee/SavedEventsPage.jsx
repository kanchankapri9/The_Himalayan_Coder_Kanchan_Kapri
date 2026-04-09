import { useEffect, useMemo, useState } from 'react'
import { Alert, CircularProgress, Typography } from '@mui/material'
import { fetchMySavedEvents } from '../../api/savedEventApi'
import AttendeeShell from '../../components/attendee/AttendeeShell'
import AttendeeSummaryCards from '../../components/attendee/AttendeeSummaryCards'
import AttendeeEventCard from '../../components/attendee/AttendeeEventCard'
import { getApiErrorMessage } from '../../utils/apiError'
import { getMockSavedEvents, mapSavedEventForCard } from '../../data/attendee'
import './AttendeePages.css'

function SavedEventsPage() {
  const [savedEvents, setSavedEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const loadSavedEvents = async () => {
      try {
        setIsLoading(true)
        const response = await fetchMySavedEvents()
        setSavedEvents(response.data || [])
        setErrorMessage('')
      } catch (error) {
        setSavedEvents(getMockSavedEvents())
        setErrorMessage(
          `${getApiErrorMessage(error, 'Could not load your saved events right now.')} Showing demo saved-event data instead.`,
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadSavedEvents()
  }, [])

  const savedCards = useMemo(
    () => savedEvents.map((savedEvent) => mapSavedEventForCard(savedEvent)),
    [savedEvents],
  )

  const summaryItems = useMemo(
    () => [
      {
        label: 'Saved events',
        value: savedCards.length,
        note: 'Events you bookmarked to revisit later',
      },
      {
        label: 'Ready this month',
        value: savedCards.length,
        note: 'A quick shortlist for your next campus plan',
      },
      {
        label: 'Quick re-open',
        value: '1 tap',
        note: 'Jump back into the event pages from here',
      },
    ],
    [savedCards.length],
  )

  return (
    <AttendeeShell
      eyebrow="Attendee Dashboard"
      title="Saved events"
      description="Keep a shortlist of events you want to revisit so you can compare dates, ticket prices, and the overall vibe before booking."
    >
      <div className="attendee-page">
        {errorMessage ? <Alert severity="warning" className="attendee-page__feedback">{errorMessage}</Alert> : null}

        <AttendeeSummaryCards items={summaryItems} />

        {isLoading && !savedCards.length ? <CircularProgress /> : null}

        {savedCards.length ? (
          <div className="attendee-page__section">
            {savedCards.map((savedEvent) => (
              <AttendeeEventCard
                key={savedEvent.id}
                image={savedEvent.image}
                title={savedEvent.title}
                date={savedEvent.date}
                location={savedEvent.location}
                meta={`${savedEvent.category} • Saved on ${savedEvent.savedAt}`}
                status={{ label: 'Saved', tone: 'neutral' }}
                primaryAction={{ label: 'View event', to: `/events/${savedEvent.eventId}` }}
                secondaryAction={{ label: 'Register now', to: `/events/${savedEvent.eventId}` }}
              />
            ))}
          </div>
        ) : (
          <div className="attendee-page__empty">
            <Typography className="attendee-page__empty-title">No saved events yet</Typography>
            <Typography className="attendee-page__empty-text">
              Use the save action on event cards to build your own short list of college fests, workshops, and community pop-ups.
            </Typography>
          </div>
        )}
      </div>
    </AttendeeShell>
  )
}

export default SavedEventsPage
