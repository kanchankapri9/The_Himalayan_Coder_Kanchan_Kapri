import { useState } from 'react'
import { Alert } from '@mui/material'
import OrganizerShell from '../../components/organizer/OrganizerShell'
import EventForm from '../../components/organizer/EventForm'
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
  const [values, setValues] = useState(initialValues)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSubmitting(true)

    window.setTimeout(() => {
      setSuccessMessage('Organizer event form is ready. Backend create-event integration can now be plugged into this UI cleanly.')
      setIsSubmitting(false)
    }, 400)
  }

  return (
    <OrganizerShell
      eyebrow="Organizer Dashboard"
      title="Create event"
      description="Set up the event basics first so tickets, approvals, registrations, and check-in can plug into a strong organizer workflow later."
    >
      <div className="organizer-page">
        {successMessage ? <Alert severity="success" className="organizer-page__feedback">{successMessage}</Alert> : null}
        <EventForm values={values} onChange={handleChange} onSubmit={handleSubmit} isSubmitting={isSubmitting} actionLabel="Save event draft" />
      </div>
    </OrganizerShell>
  )
}

export default CreateEventPage
