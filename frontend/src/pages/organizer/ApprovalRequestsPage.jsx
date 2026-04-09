import { useMemo, useState } from 'react'
import { Alert, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
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

function ApprovalRequestsPage() {
  const { eventId } = useParams()
  const event = getMockOrganizerEventById(eventId)
  const [registrations, setRegistrations] = useState(() => getMockOrganizerRegistrations(eventId))
  const [feedbackMessage, setFeedbackMessage] = useState('')

  const pendingRegistrations = useMemo(
    () => registrations.filter((item) => item.status === 'pending'),
    [registrations],
  )

  const rows = useMemo(
    () => pendingRegistrations.map((item) => mapOrganizerRegistrationForRow(item)),
    [pendingRegistrations],
  )

  const summaryItems = useMemo(() => getOrganizerRegistrationSummary(pendingRegistrations), [pendingRegistrations])

  const updateRegistrationStatus = (registrationId, nextStatus) => {
    setRegistrations((current) =>
      current.map((item) =>
        item._id === registrationId
          ? {
              ...item,
              status: nextStatus,
            }
          : item,
      ),
    )

    setFeedbackMessage(
      nextStatus === 'confirmed'
        ? 'Approval state updated locally. Connect the backend approve endpoint next to make this action live.'
        : 'Rejection state updated locally. Connect the backend reject endpoint next to make this action live.',
    )
  }

  return (
    <OrganizerShell
      eyebrow="Organizer Dashboard"
      title="Approval requests"
      description="Handle pending registrations with a focused approval queue so your team can confirm access quickly and keep attendee communication clean."
    >
      <div className="organizer-page">
        {feedbackMessage ? <Alert severity="success" className="organizer-page__feedback">{feedbackMessage}</Alert> : null}

        {event ? (
          <>
            <OrganizerSummaryCards items={summaryItems} />

            {rows.length ? (
              <div className="organizer-page__panel">
                <Typography className="organizer-page__panel-title">Pending approvals for {event.title}</Typography>
                <RegistrationTable
                  rows={rows}
                  showActions
                  onApprove={(registrationId) => updateRegistrationStatus(registrationId, 'confirmed')}
                  onReject={(registrationId) => updateRegistrationStatus(registrationId, 'cancelled')}
                />
              </div>
            ) : (
              <div className="organizer-page__empty">
                <Typography className="organizer-page__empty-title">No pending approvals</Typography>
                <Typography className="organizer-page__empty-text">
                  This queue is clear right now. Once attendees request approval-based access, they will appear here for organizer review.
                </Typography>
              </div>
            )}
          </>
        ) : (
          <div className="organizer-page__empty">
            <Typography className="organizer-page__empty-title">Approval queue unavailable</Typography>
            <Typography className="organizer-page__empty-text">
              This event could not be loaded from the current organizer dataset. Once live backend approval routes are available, this page can fetch real pending requests.
            </Typography>
          </div>
        )}
      </div>
    </OrganizerShell>
  )
}

export default ApprovalRequestsPage
