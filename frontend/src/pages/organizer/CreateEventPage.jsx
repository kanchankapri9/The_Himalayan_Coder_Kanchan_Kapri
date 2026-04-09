import { useState } from 'react'
import { Alert, CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import OrganizerShell from '../../components/organizer/OrganizerShell'
import EventForm from '../../components/organizer/EventForm'
import { createEvent } from '../../api/eventApi'
import { getApiErrorMessage } from '../../utils/apiError'
import './OrganizerPages.css'

const initialValues = {
  title: '',
  category: 'Tech Fest',
  eventType: 'offline',
  status: 'draft',
  startDate: '2026-05-20T10:00',
  endDate: '2026-05-20T18:00',
  venueName: '',
  city: '',
  capacity: 300,
  featuredImage: '',
  description: '',
}

function CreateEventPage() {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialValues)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const response = await createEvent(values)
      setSuccessMessage('Event created successfully! Redirecting to your events...')
      
      window.setTimeout(() => {
        navigate('/organizer/events/' + (response.data?._id || 'my'))
      }, 1500)
    } catch (error) {
      setErrorMessage(
        getApiErrorMessage(error, 'Failed to create event. Please check your information and try again.')
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <OrganizerShell
      eyebrow="Organizer Dashboard"
      title="Create event"
      description="Set up the event basics first so tickets, approvals, registrations, and check-in can plug into a strong organizer workflow later."
    >
      <div className="organizer-page">
        {successMessage ? <Alert severity="success" className="organizer-page__feedback">{successMessage}</Alert> : null}
        {errorMessage ? <Alert severity="error" className="organizer-page__feedback">{errorMessage}</Alert> : null}
        {isSubmitting && <CircularProgress sx={{ my: 2 }} />}
        <EventForm values={values} onChange={handleChange} onSubmit={handleSubmit} isSubmitting={isSubmitting} actionLabel="Save event draft" />
      </div>
    </OrganizerShell>
  )
}

export default CreateEventPage
