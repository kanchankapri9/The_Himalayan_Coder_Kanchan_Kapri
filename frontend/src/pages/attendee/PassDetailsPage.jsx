import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Alert, CircularProgress, Typography } from '@mui/material'
import { fetchPassById } from '../../api/passApi'
import AttendeeShell from '../../components/attendee/AttendeeShell'
import PassHeroCard from '../../components/attendee/PassHeroCard'
import { getApiErrorMessage } from '../../utils/apiError'
import { getMockPassById, mapPassForDetails } from '../../data/attendee'
import { downloadEventCalendarFile } from '../../utils/calendar'
import { downloadPassFile } from '../../utils/passDownload'
import './AttendeePages.css'

function PassDetailsPage() {
  const { passId } = useParams()
  const [passRecord, setPassRecord] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [actionMessage, setActionMessage] = useState('')

  useEffect(() => {
    const loadPass = async () => {
      try {
        setIsLoading(true)
        const response = await fetchPassById(passId)
        setPassRecord(response.data)
        setErrorMessage('')
      } catch (error) {
        const fallbackPass = getMockPassById(passId)

        if (fallbackPass) {
          setPassRecord(fallbackPass)
          setErrorMessage(
            `${getApiErrorMessage(error, 'Could not load the live pass right now.')} Showing demo pass data instead.`,
          )
        } else {
          setPassRecord(null)
          setErrorMessage(getApiErrorMessage(error, 'Could not load this pass right now.'))
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadPass()
  }, [passId])

  const pass = useMemo(() => {
    if (!passRecord) {
      return null
    }

    return mapPassForDetails(passRecord)
  }, [passRecord])

  if (isLoading && !pass) {
    return <CircularProgress />
  }

  return (
    <AttendeeShell
      eyebrow="Attendee Dashboard"
      title="Pass details"
      description="Keep everything you need for entry in one place, including your pass number, QR information, and event timing."
    >
      <div className="attendee-page">
        {errorMessage ? <Alert severity="warning" className="attendee-page__feedback">{errorMessage}</Alert> : null}
        {actionMessage ? <Alert severity="success" className="attendee-page__feedback">{actionMessage}</Alert> : null}

        {pass ? (
          <>
            <PassHeroCard
              pass={pass}
              onAddToCalendar={() => {
                downloadEventCalendarFile({
                  title: pass.title,
                  description: `FestFlow event pass for ${pass.attendeeName}`,
                  location: pass.location,
                  startDate: passRecord.event?.startDate,
                  endDate: passRecord.event?.endDate,
                })
                setActionMessage('Calendar file downloaded successfully.')
              }}
              onDownloadPass={() => {
                downloadPassFile(pass)
                setActionMessage('Pass file downloaded successfully.')
              }}
            />

            <div className="attendee-page__details-grid">
              <div className="attendee-page__panel">
                <Typography className="attendee-page__panel-title">Attendee details</Typography>
                <Typography className="attendee-page__detail-line">Name: {pass.attendeeName}</Typography>
                <Typography className="attendee-page__detail-line">Email: {pass.attendeeEmail}</Typography>
                <Typography className="attendee-page__detail-line">Issued at: {pass.issuedAt}</Typography>
              </div>

              <div className="attendee-page__panel">
                <Typography className="attendee-page__panel-title">Entry window</Typography>
                <Typography className="attendee-page__detail-line">Starts: {pass.startDate}</Typography>
                <Typography className="attendee-page__detail-line">Ends: {pass.endDate}</Typography>
                <Typography className="attendee-page__detail-line">Status: {pass.status}</Typography>
              </div>
            </div>
          </>
        ) : (
          <div className="attendee-page__empty">
            <Typography className="attendee-page__empty-title">Pass not found</Typography>
            <Typography className="attendee-page__empty-text">
              This pass is not available right now. It may not have been issued yet or the link may be incomplete.
            </Typography>
          </div>
        )}
      </div>
    </AttendeeShell>
  )
}

export default PassDetailsPage
