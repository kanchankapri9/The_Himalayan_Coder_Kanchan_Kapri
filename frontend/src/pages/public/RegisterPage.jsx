import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthForm from '../../components/auth/AuthForm'
import AuthPageLayout from '../../components/auth/AuthPageLayout'
import { useAuth } from '../../context/AuthContext'

function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')

  const handleRegister = async (payload) => {
    try {
      setIsSubmitting(true)
      setServerError('')
      await register(payload)
      navigate('/home')
    } catch (error) {
      setServerError(error.response?.data?.message || 'Failed to create account.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthPageLayout
      badgeText="Start for free"
      heading="Create your FestFlow account."
      subText="Set up your account to explore events, save favorites, and get QR passes after registration."
    >
      <AuthForm
        mode="register"
        onSubmit={handleRegister}
        isSubmitting={isSubmitting}
        serverError={serverError}
      />
    </AuthPageLayout>
  )
}

export default RegisterPage
