import { useEffect, useMemo, useState } from 'react'
import { Alert, CircularProgress, Typography } from '@mui/material'
import { fetchMyRegistrations } from '../../api/registrationApi'
import AttendeeShell from '../../components/attendee/AttendeeShell'
import AttendeeSummaryCards from '../../components/attendee/AttendeeSummaryCards'
import AttendeeEventCard from '../../components/attendee/AttendeeEventCard'
import { getApiErrorMessage } from '../../utils/apiError'
import { getMockRegistrations, mapRegistrationForCard } from '../../data/attendee'
import './AttendeePages.css'

function MyRegistrationsPage() {
  const [registrations, setRegistrations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const loadRegistrations = async () => {
      try {
        setIsLoading(true)
        const response = await fetchMyRegistrations()
        setRegistrations(response.data || [])
        setErrorMessage('')
      } catch (error) {
        setRegistrations(getMockRegistrations())
        setErrorMessage(
          `${getApiErrorMessage(error, 'Could not load your live registrations right now.')} Showing demo registration data instead.`,
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadRegistrations()
  }, [])

  const registrationCards = useMemo(
    () => registrations.map((registration) => mapRegistrationForCard(registration)),
    [registrations],
  )

  const summaryItems = useMemo(() => {
    const confirmed = registrations.filter((item) => item.status === 'confirmed').length
    const pending = registrations.filter((item) => item.status === 'pending').length

    return [
      {
        label: 'Total registrations',
        value: registrations.length,
        note: 'All your recent event bookings in one place',
      },
      {
        label: 'Confirmed passes',
        value: confirmed,
        note: 'Ready for entry once pass is issued',
      },
      {
        label: 'Pending approvals',
        value: pending,
        note: 'These need organizer confirmation first',
      },
    ]
  }, [registrations])

  return (
    <AttendeeShell
      eyebrow="Attendee Dashboard"
      title="My registrations"
      description="Track every booking, check approval progress, and jump straight back into the events you are attending."
    >
      <div className="attendee-page">
        {errorMessage ? <Alert severity="warning" className="attendee-page__feedback">{errorMessage}</Alert> : null}

        <AttendeeSummaryCards items={summaryItems} />

        {isLoading && !registrationCards.length ? <CircularProgress /> : null}

        {registrationCards.length ? (
          <div className="attendee-page__section">
            {registrationCards.map((registration) => (
              <AttendeeEventCard
                key={registration.id}
                image={registration.image}
                title={registration.title}
                date={registration.date}
                location={registration.location}
                meta={`${registration.ticketName} • ${registration.amount} • Booked on ${registration.createdAt}`}
                status={{
                  label: registration.status,
                  tone: registration.status === 'confirmed' ? 'success' : registration.status === 'pending' ? 'warning' : 'neutral',
                }}
                primaryAction={{ label: 'View event', to: `/events/${registration.eventId}` }}
                secondaryAction={{
                  label: registration.status === 'confirmed' ? 'Open pass' : 'Check status',
                  to: registration.status === 'confirmed' ? '/attendee/passes' : '/attendee/registrations',
                }}
              />
            ))}
          </div>
        ) : (
          <div className="attendee-page__empty">
            <Typography className="attendee-page__empty-title">No registrations yet</Typography>
            <Typography className="attendee-page__empty-text">
              Once you book a fest, pop-up, or meetup, it will appear here with its current approval or booking status.
            </Typography>
          </div>
        )}
      </div>
    </AttendeeShell>
  )
}

export default MyRegistrationsPage
