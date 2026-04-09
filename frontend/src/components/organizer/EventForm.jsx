import { Button, MenuItem, TextField, Typography } from '@mui/material'
import './EventForm.css'

const categoryOptions = ['Tech Fest', 'Pop-Up', 'College Fest', 'Community Event', 'Workshop']
const eventTypeOptions = ['offline', 'online', 'hybrid']
const statusOptions = ['draft', 'published']

function EventForm({ values, onChange, onSubmit, isSubmitting, actionLabel = 'Save event' }) {
  return (
    <form className="event-form" onSubmit={onSubmit}>
      <div className="event-form__grid">
        <TextField
          label="Event title"
          name="title"
          value={values.title}
          onChange={onChange}
          fullWidth
        />
        <TextField
          select
          label="Category"
          name="category"
          value={values.category}
          onChange={onChange}
          fullWidth
        >
          {categoryOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Event type"
          name="eventType"
          value={values.eventType}
          onChange={onChange}
          fullWidth
        >
          {eventTypeOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Publish status"
          name="status"
          value={values.status}
          onChange={onChange}
          fullWidth
        >
          {statusOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Start date and time"
          name="startDate"
          type="datetime-local"
          value={values.startDate}
          onChange={onChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="End date and time"
          name="endDate"
          type="datetime-local"
          value={values.endDate}
          onChange={onChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Venue name"
          name="venueName"
          value={values.venueName}
          onChange={onChange}
          fullWidth
        />
        <TextField
          label="City"
          name="city"
          value={values.city}
          onChange={onChange}
          fullWidth
        />
        <TextField
          label="Capacity"
          name="capacity"
          type="number"
          value={values.capacity}
          onChange={onChange}
          fullWidth
        />
        <TextField
          label="Featured image URL"
          name="featuredImage"
          value={values.featuredImage}
          onChange={onChange}
          fullWidth
        />
      </div>

      <TextField
        label="Short description"
        name="description"
        value={values.description}
        onChange={onChange}
        multiline
        minRows={4}
        fullWidth
      />

      <div className="event-form__ticket-panel">
        <Typography className="event-form__panel-title">Starter ticket preview</Typography>
        <Typography className="event-form__panel-text">
          Ticket tier management will connect to the real backend ticket endpoints in the next phase. For now, this form focuses on clean event creation UI and structure.
        </Typography>
      </div>

      <div className="event-form__actions">
        <Button type="submit" variant="contained" className="event-form__button" disabled={isSubmitting}>
          {actionLabel}
        </Button>
      </div>
    </form>
  )
}

export default EventForm
