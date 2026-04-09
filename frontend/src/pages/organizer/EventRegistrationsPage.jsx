import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Alert, Button, Typography } from '@mui/material'
import OrganizerShell from '../../components/organizer/OrganizerShell'
import OrganizerSummaryCards from '../../components/organizer/OrganizerSummaryCards'
import RegistrationTable from '../../components/organizer/RegistrationTable'
import {
  getMockOrganizerEventById,
  getMockOrganizerRegistrations,
  getOrganizerRegistrationSummary,
  mapOrganizerRegistrationForRow,
} from '../../data/organizer'
import './OrganizerPages.css'

function EventRegistrationsPage() {
  const { eventId } = useParams()
  const event = getMockOrganizerEventById(eventId)
  const [registrations] = useState(() => getMockOrganizerRegistrations(eventId))

  const rows = useMemo(() => registrations.map((item) => mapOrganizerRegistrationForRow(item)), [registrations])
  const summaryItems = useMemo(() => getOrganizerRegistrationSummary(registrations), [registrations])

  return (
    <OrganizerShell
      eyebrow="Organizer Dashboard"
      title="Event registrations"
      description="Review every attendee request for this event, understand ticket mix, and move quickly between general registration tracking and approval work."
    >
      <div className="organizer-page">
        {event ? (
          <>
            <Alert severity="info" className="organizer-page__feedback">
              Viewing registrations for <strong>{event.title}</strong>. Approval actions will become live once backend approval endpoints are connected.
            </Alert>

            <OrganizerSummaryCards items={summaryItems} />

            <div className="organizer-page__panel">
              <Typography className="organizer-page__panel-title">Registration queue</Typography>
              <RegistrationTable rows={rows} />
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
              This event could not be found in the current organizer frontend data. Once live organizer APIs are ready, this page can load real registration records.
            </Typography>
          </div>
        )}
      </div>
    </OrganizerShell>
  )
}

export default EventRegistrationsPage
