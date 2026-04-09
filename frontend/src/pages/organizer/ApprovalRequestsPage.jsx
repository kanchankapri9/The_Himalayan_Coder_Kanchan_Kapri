import { useEffect, useMemo, useState } from 'react'
import { Alert, CircularProgress, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import OrganizerShell from '../../components/organizer/OrganizerShell'
import OrganizerSummaryCards from '../../components/organizer/OrganizerSummaryCards'
import RegistrationTable from '../../components/organizer/RegistrationTable'
import { getEventRegistrations, approveRegistration, rejectRegistration } from '../../api/organizerApi'
import { fetchEventById } from '../../api/eventApi'
import { getApiErrorMessage } from '../../utils/apiError'
import {
  getMockOrganizerEventById,
  getMockOrganizerRegistrations,
  getOrganizerRegistrationSummary,
  mapOrganizerRegistrationForRow,
} from '../../data/organizer'
import './OrganizerPages.css'

function ApprovalRequestsPage() {
  const { eventId } = useParams()
  const [event, setEvent] = useState(null)
  const [registrations, setRegistrations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(null)
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [feedbackType, setFeedbackType] = useState('success')

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const eventResponse = await fetchEventById(eventId)
        setEvent(eventResponse.data || eventResponse)
        
        const registrationsResponse = await getEventRegistrations(eventId)
        setRegistrations(registrationsResponse.data || [])
      } catch (error) {
        setEvent(getMockOrganizerEventById(eventId))
        setRegistrations(getMockOrganizerRegistrations(eventId))
        setFeedbackMessage(
          `${getApiErrorMessage(error, 'Could not load approvals.')} Showing demo data instead.`,
        )
        setFeedbackType('warning')
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [eventId])

  const pendingRegistrations = useMemo(
    () => registrations.filter((item) => item.status === 'pending'),
    [registrations],
  )

  const rows = useMemo(
    () => pendingRegistrations.map((item) => mapOrganizerRegistrationForRow(item)),
    [pendingRegistrations],
  )

  const summaryItems = useMemo(() => getOrganizerRegistrationSummary(pendingRegistrations), [pendingRegistrations])

  const updateRegistrationStatus = async (registrationId, nextStatus) => {
    try {
      setActionLoading(registrationId)
      
      if (nextStatus === 'confirmed') {
        await approveRegistration(registrationId)
        setFeedbackMessage('Registration approved successfully!')
      } else {
        await rejectRegistration(registrationId)
        setFeedbackMessage('Registration rejected.')
      }
      
      setFeedbackType('success')
      
      // Update local state
      setRegistrations((current) =>
        current.map((item) =>
          item._id === registrationId
            ? { ...item, status: nextStatus }
            : item,
        ),
      )
    } catch (error) {
      setFeedbackMessage(
        getApiErrorMessage(error, `Failed to ${nextStatus === 'confirmed' ? 'approve' : 'reject'} registration.`),
      )
      setFeedbackType('error')
    } finally {
      setActionLoading(null)
    }
  }

  return (
    <OrganizerShell
      eyebrow="Organizer Dashboard"
      title="Approval requests"
      description="Handle pending registrations with a focused approval queue so your team can confirm access quickly and keep attendee communication clean."
    >
      <div className="organizer-page">
        {feedbackMessage ? <Alert severity={feedbackType} className="organizer-page__feedback">{feedbackMessage}</Alert> : null}

        {isLoading && !event ? <CircularProgress /> : null}

        {event ? (
          <>
            <OrganizerSummaryCards items={summaryItems} />

            {rows.length ? (
              <div className="organizer-page__panel">
                <Typography className="organizer-page__panel-title">Pending approvals for {event.title}</Typography>
                {isLoading && !rows.length ? (
                  <CircularProgress />
                ) : (
                  <RegistrationTable
                    rows={rows}
                    showActions
                    actionLoading={actionLoading}
                    onApprove={(registrationId) => updateRegistrationStatus(registrationId, 'confirmed')}
                    onReject={(registrationId) => updateRegistrationStatus(registrationId, 'cancelled')}
                  />
                )}
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
              This event could not be found. Please check the event ID and try again.
            </Typography>
          </div>
        )}
      </div>
    </OrganizerShell>
  )
}

export default ApprovalRequestsPage
