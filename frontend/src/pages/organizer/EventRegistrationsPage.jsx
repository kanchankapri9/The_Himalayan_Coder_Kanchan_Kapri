import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Alert, Button, CircularProgress, Typography } from '@mui/material'
import OrganizerShell from '../../components/organizer/OrganizerShell'
import OrganizerSummaryCards from '../../components/organizer/OrganizerSummaryCards'
import RegistrationTable from '../../components/organizer/RegistrationTable'
import { getEventRegistrations } from '../../api/organizerApi'
import { fetchEventById } from '../../api/eventApi'
import { getApiErrorMessage } from '../../utils/apiError'
import {
  getMockOrganizerEventById,
  getMockOrganizerRegistrations,
  getOrganizerRegistrationSummary,
  mapOrganizerRegistrationForRow,
} from '../../data/organizer'
import './OrganizerPages.css'

function EventRegistrationsPage() {
  const { eventId } = useParams()
  const [event, setEvent] = useState(null)
  const [registrations, setRegistrations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        
        // Fetch event details
        const eventResponse = await fetchEventById(eventId)
        setEvent(eventResponse.data || eventResponse)
        
        // Fetch registrations
        const registrationsResponse = await getEventRegistrations(eventId)
        setRegistrations(registrationsResponse.data || [])
        
        setErrorMessage('')
      } catch (error) {
        setEvent(getMockOrganizerEventById(eventId))
        setRegistrations(getMockOrganizerRegistrations(eventId))
        setErrorMessage(
          `${getApiErrorMessage(error, 'Could not load registrations.')} Showing demo data instead.`,
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [eventId])

  const rows = useMemo(() => registrations.map((item) => mapOrganizerRegistrationForRow(item)), [registrations])
  const summaryItems = useMemo(() => getOrganizerRegistrationSummary(registrations), [registrations])

  return (
    <OrganizerShell
      eyebrow="Organizer Dashboard"
      title="Event registrations"
      description="Review every attendee request for this event, understand ticket mix, and move quickly between general registration tracking and approval work."
    >
      <div className="organizer-page">
        {errorMessage ? <Alert severity="warning" className="organizer-page__feedback">{errorMessage}</Alert> : null}
        
        {isLoading && !event ? <CircularProgress /> : null}
        
        {event ? (
          <>
            <Alert severity="info" className="organizer-page__feedback">
              Viewing registrations for <strong>{event.title}</strong>
            </Alert>

            <OrganizerSummaryCards items={summaryItems} />

            <div className="organizer-page__panel">
              <Typography className="organizer-page__panel-title">Registration queue</Typography>
              {isLoading && !rows.length ? <CircularProgress /> : <RegistrationTable rows={rows} />}
            </div>

            <div className="organizer-page__panel">
              <Typography className="organizer-page__panel-title">Quick actions</Typography>
              <Typography className="organizer-page__line">
                Use the approval screen for pending requests that need organizer decisions before passes are issued.
              </Typography>
              <Button component={Link} to={`/organizer/events/${eventId}/approvals`} variant="contained" sx={{ mt: 2 }}>
                Open approvals
              </Button>
            </div>
          </>
        ) : (
          <div className="organizer-page__empty">
            <Typography className="organizer-page__empty-title">Event registrations unavailable</Typography>
            <Typography className="organizer-page__empty-text">
              This event could not be found. Please check the event ID and try again.
            </Typography>
          </div>
        )}
      </div>
    </OrganizerShell>
  )
}

export default EventRegistrationsPage
