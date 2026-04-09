import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthForm from '../../components/auth/AuthForm'
import AuthPageLayout from '../../components/auth/AuthPageLayout'
import { useAuth } from '../../context/AuthContext'

function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')

  const handleLogin = async (payload) => {
    try {
      setIsSubmitting(true)
      setServerError('')
      await login(payload)
      navigate(location.state?.from || '/home')
    } catch (error) {
      setServerError(error.response?.data?.message || 'Failed to log in.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthPageLayout
      badgeText="Welcome back"
      heading="Log in and jump back in."
      subText="Continue exploring local fests, track your registrations, and manage event check-ins from your dashboard."
    >
      <AuthForm
        mode="login"
        onSubmit={handleLogin}
        isSubmitting={isSubmitting}
        serverError={serverError}
      />
    </AuthPageLayout>
  )
}

export default LoginPage
