import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import OrganizerShell from '../../components/organizer/OrganizerShell'
import { getMockOrganizerEventById, mapOrganizerEventDetails } from '../../data/organizer'
import './OrganizerPages.css'

function ManageEventPage() {
  const { eventId } = useParams()
  const event = useMemo(() => {
    const eventRecord = getMockOrganizerEventById(eventId)
    return eventRecord ? mapOrganizerEventDetails(eventRecord) : null
  }, [eventId])

  return (
    <OrganizerShell
      eyebrow="Organizer Dashboard"
      title="Manage event"
      description="Use this page as the control center for event information, performance, and ticket structure before approvals and check-in modules are added."
    >
      <div className="organizer-page">
        {event ? (
          <>
            <div className="organizer-page__grid">
              <div className="organizer-page__panel">
                <Typography className="organizer-page__panel-title">Event overview</Typography>
                <Typography className="organizer-page__line">Title: {event.title}</Typography>
                <Typography className="organizer-page__line">Category: {event.category}</Typography>
                <Typography className="organizer-page__line">Status: {event.status}</Typography>
                <Typography className="organizer-page__line">Type: {event.eventType}</Typography>
                <Typography className="organizer-page__line">Starts: {event.formattedStartDate}</Typography>
                <Typography className="organizer-page__line">Ends: {event.formattedEndDate}</Typography>
                <Typography className="organizer-page__line">
                  Venue: {event.venue?.name}, {event.venue?.addressLine1}, {event.venue?.city}
                </Typography>
                <Typography className="organizer-page__line">Capacity: {event.capacity}</Typography>
              </div>

              <div className="organizer-page__panel">
                <Typography className="organizer-page__panel-title">Current performance</Typography>
                <Typography className="organizer-page__line">
                  Total registrations: {event.analytics?.totalRegistrations || 0}
                </Typography>
                <Typography className="organizer-page__line">
                  Pending approvals: {event.analytics?.pendingApprovals || 0}
                </Typography>
                <Typography className="organizer-page__line">
                  Checked in: {event.analytics?.checkedIn || 0}
                </Typography>
                <Typography className="organizer-page__line">
                  Estimated revenue: {event.formattedRevenue}
                </Typography>
              </div>
            </div>

            <div className="organizer-page__panel">
              <Typography className="organizer-page__panel-title">Description</Typography>
              <Typography className="organizer-page__line">{event.description}</Typography>
            </div>

            <div className="organizer-page__panel">
              <Typography className="organizer-page__panel-title">Ticket overview</Typography>
              <div className="organizer-page__ticket-list">
                {event.tickets.map((ticket) => (
                  <div key={ticket.name} className="organizer-page__ticket-item">
                    <Typography className="organizer-page__ticket-title">{ticket.name}</Typography>
                    <Typography className="organizer-page__ticket-meta">
                      Price: Rs. {ticket.price} • Sold: {ticket.sold}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>

            <div className="organizer-page__panel">
              <Typography className="organizer-page__panel-title">Registration management</Typography>
              <Typography className="organizer-page__line">
                Jump into the event registration queue to review attendees, then open the approval page for approval-based requests.
              </Typography>
              <div className="organizer-page__actions">
                <Button component={Link} to={`/organizer/events/${eventId}/registrations`} variant="contained">
                  View registrations
                </Button>
                <Button component={Link} to={`/organizer/events/${eventId}/approvals`} variant="outlined">
                  Approval requests
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="organizer-page__empty">
            <Typography className="organizer-page__empty-title">Event not found</Typography>
            <Typography className="organizer-page__empty-text">
              This organizer event is not available in the current frontend foundation. Once backend organizer APIs are ready, this page can load live event management data.
            </Typography>
          </div>
        )}
      </div>
    </OrganizerShell>
  )
}

export default ManageEventPage
