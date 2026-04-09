import { useEffect, useMemo, useState } from 'react'
import { Alert, CircularProgress, Typography } from '@mui/material'
import { fetchMyPasses } from '../../api/passApi'
import AttendeeShell from '../../components/attendee/AttendeeShell'
import AttendeeSummaryCards from '../../components/attendee/AttendeeSummaryCards'
import AttendeeEventCard from '../../components/attendee/AttendeeEventCard'
import { getApiErrorMessage } from '../../utils/apiError'
import { getMockPasses, mapPassForCard } from '../../data/attendee'
import './AttendeePages.css'

function MyPassesPage() {
  const [passes, setPasses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const loadPasses = async () => {
      try {
        setIsLoading(true)
        const response = await fetchMyPasses()
        setPasses(response.data || [])
        setErrorMessage('')
      } catch (error) {
        setPasses(getMockPasses())
        setErrorMessage(
          `${getApiErrorMessage(error, 'Could not load your live passes right now.')} Showing demo pass data instead.`,
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadPasses()
  }, [])

  const passCards = useMemo(() => passes.map((pass) => mapPassForCard(pass)), [passes])

  const summaryItems = useMemo(() => {
    const activePasses = passes.filter((pass) => pass.status === 'active').length

    return [
      {
        label: 'Available passes',
        value: passCards.length,
        note: 'Every confirmed event pass you can open instantly',
      },
      {
        label: 'Active now',
        value: activePasses,
        note: 'Ready to scan at the event gate',
      },
      {
        label: 'Quick access',
        value: 'QR ready',
        note: 'Built for fast entry and fewer last-minute issues',
      },
    ]
  }, [passes, passCards.length])

  return (
    <AttendeeShell
      eyebrow="Attendee Dashboard"
      title="My passes"
      description="Open all your event passes in one place, review their status, and get ready for a smooth check-in experience on event day."
    >
      <div className="attendee-page">
        {errorMessage ? <Alert severity="warning" className="attendee-page__feedback">{errorMessage}</Alert> : null}

        <AttendeeSummaryCards items={summaryItems} />

        {isLoading && !passCards.length ? <CircularProgress /> : null}

        {passCards.length ? (
          <div className="attendee-page__section">
            {passCards.map((pass) => (
              <AttendeeEventCard
                key={pass.id}
                image={pass.image}
                title={pass.title}
                date={pass.date}
                location={pass.location}
                meta={`${pass.passNumber} • Issued on ${pass.issuedAt}`}
                status={{
                  label: pass.status,
                  tone: pass.status === 'active' ? 'success' : 'neutral',
                }}
                primaryAction={{ label: 'Open pass', to: `/attendee/passes/${pass.id}` }}
                secondaryAction={{ label: 'View event', to: `/events/${pass.eventId}` }}
              />
            ))}
          </div>
        ) : (
          <div className="attendee-page__empty">
            <Typography className="attendee-page__empty-title">No passes available yet</Typography>
            <Typography className="attendee-page__empty-text">
              Confirmed registrations will appear here as digital event passes once they are issued by the system or organizer.
            </Typography>
          </div>
        )}
      </div>
    </AttendeeShell>
  )
}

export default MyPassesPage
