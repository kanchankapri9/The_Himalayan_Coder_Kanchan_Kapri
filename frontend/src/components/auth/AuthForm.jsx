import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Button, MenuItem, Stack, TextField, Typography } from '@mui/material'
import './AuthForm.css'

function AuthForm({ mode = 'register', onSubmit, isSubmitting = false, serverError = '' }) {
  const isRegister = mode === 'register'
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    role: 'attendee',
    phone: '',
    college: '',
    password: '',
  })

  const handleChange = (field) => (event) => {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: event.target.value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!onSubmit) {
      return
    }

    const payload = isRegister
      ? formValues
      : { email: formValues.email, password: formValues.password }

    await onSubmit(payload)
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <Typography className="auth-form__switch">
        {isRegister ? 'Already a member?' : 'New to FestFlow?'}{' '}
        <Link to={isRegister ? '/login' : '/register'}>
          {isRegister ? 'Log In' : 'Create account'}
        </Link>
      </Typography>

      {serverError && <Alert severity="error">{serverError}</Alert>}

      <Stack spacing={1.1}>
        {isRegister && (
          <TextField
            label="Full name"
            fullWidth
            size="small"
            value={formValues.name}
            onChange={handleChange('name')}
          />
        )}

        <TextField
          label="Email"
          type="email"
          fullWidth
          size="small"
          value={formValues.email}
          onChange={handleChange('email')}
        />

        {isRegister && (
          <>
            <TextField
              select
              label="Join as"
              fullWidth
              size="small"
              value={formValues.role}
              onChange={handleChange('role')}
            >
              <MenuItem value="attendee">Attendee</MenuItem>
              <MenuItem value="organizer">Organizer</MenuItem>
            </TextField>
            <TextField
              label="Phone number"
              fullWidth
              size="small"
              value={formValues.phone}
              onChange={handleChange('phone')}
            />
            <TextField
              label="College"
              fullWidth
              size="small"
              value={formValues.college}
              onChange={handleChange('college')}
            />
          </>
        )}

        <TextField
          label="Password"
          type="password"
          fullWidth
          size="small"
          value={formValues.password}
          onChange={handleChange('password')}
        />

        <div className="auth-form__actions">
          <Button type="submit" variant="contained" className="auth-form__primary-button" disabled={isSubmitting}>
            {isRegister ? 'Create account' : 'Log in'}
          </Button>
        </div>
      </Stack>
    </form>
  )
}

export default AuthForm
