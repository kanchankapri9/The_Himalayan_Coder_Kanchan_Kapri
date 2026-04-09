import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Button, MenuItem, Stack, TextField, Typography } from '@mui/material'
import './AuthForm.css'

const initialRegisterState = {
  name: '',
  email: '',
  role: 'attendee',
  password: '',
  phone: '',
  college: '',
}

const initialLoginState = {
  email: '',
  password: '',
}

function AuthForm({ mode = 'register', onSubmit, isSubmitting = false, serverError = '' }) {
  const isRegister = mode === 'register'
  const [formValues, setFormValues] = useState(isRegister ? initialRegisterState : initialLoginState)

  const submitLabel = useMemo(() => {
    if (isSubmitting) {
      return isRegister ? 'Creating account...' : 'Logging in...'
    }

    return isRegister ? 'Create account' : 'Log in'
  }, [isRegister, isSubmitting])

  const handleChange = (field) => (event) => {
    setFormValues((current) => ({
      ...current,
      [field]: event.target.value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!onSubmit) {
      return
    }

    await onSubmit(formValues)
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <Typography className="auth-form__switch">
        {isRegister ? 'Already a member?' : 'New to FestFlow?'}{' '}
        <Link to={isRegister ? '/login' : '/register'}>{isRegister ? 'Log In' : 'Create account'}</Link>
      </Typography>

      {serverError ? <Alert severity="error" className="auth-form__alert">{serverError}</Alert> : null}

      <Stack spacing={1.1}>
        {isRegister ? (
          <>
            <TextField label="Full name" fullWidth size="small" value={formValues.name} onChange={handleChange('name')} required />
            <TextField label="Email" type="email" fullWidth size="small" value={formValues.email} onChange={handleChange('email')} required />
            <TextField select label="Join as" fullWidth size="small" value={formValues.role} onChange={handleChange('role')}>
              <MenuItem value="attendee">Attendee</MenuItem>
              <MenuItem value="organizer">Organizer</MenuItem>
            </TextField>
            <div className="auth-form__row">
              <TextField label="Phone" fullWidth size="small" value={formValues.phone} onChange={handleChange('phone')} />
              <TextField label="College" fullWidth size="small" value={formValues.college} onChange={handleChange('college')} />
            </div>
            <TextField label="Password" type="password" fullWidth size="small" value={formValues.password} onChange={handleChange('password')} required />
          </>
        ) : (
          <>
            <TextField label="Email" type="email" fullWidth size="small" value={formValues.email} onChange={handleChange('email')} required />
            <TextField label="Password" type="password" fullWidth size="small" value={formValues.password} onChange={handleChange('password')} required />
          </>
        )}

        <div className="auth-form__actions">
          <Button type="submit" variant="contained" className="auth-form__primary-button" disabled={isSubmitting}>
            {submitLabel}
          </Button>
        </div>
      </Stack>
    </form>
  )
}

export default AuthForm
