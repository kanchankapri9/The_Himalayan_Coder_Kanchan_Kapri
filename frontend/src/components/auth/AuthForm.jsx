import { Link } from 'react-router-dom'
import { Button, MenuItem, Stack, TextField, Typography } from '@mui/material'
import './AuthForm.css'

function AuthForm({ mode = 'register' }) {
  const isRegister = mode === 'register'

  return (
    <div className="auth-form">
      <Typography className="auth-form__switch">
        {isRegister ? 'Already a member?' : 'New to FestFlow?'}{' '}
        <Link to={isRegister ? '/login' : '/register'}>
          {isRegister ? 'Log In' : 'Create account'}
        </Link>
      </Typography>

      <Stack spacing={1.1}>
        {isRegister && (
          <div className="auth-form__row">
            <TextField label="First name" fullWidth size="small" />
            <TextField label="Last name" fullWidth size="small" />
          </div>
        )}

        <TextField label="Email" type="email" fullWidth size="small" />

        {isRegister && (
          <TextField select label="Join as" defaultValue="attendee" fullWidth size="small">
            <MenuItem value="attendee">Attendee</MenuItem>
            <MenuItem value="organizer">Organizer</MenuItem>
          </TextField>
        )}

        <TextField label="Password" type="password" fullWidth size="small" />

        <div className="auth-form__actions">
          <Button variant="contained" className="auth-form__primary-button">
            {isRegister ? 'Create account' : 'Log in'}
          </Button>
        </div>
      </Stack>
    </div>
  )
}

export default AuthForm
