<<<<<<< Updated upstream
=======
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
>>>>>>> Stashed changes
import AuthForm from '../../components/auth/AuthForm'
import AuthPageLayout from '../../components/auth/AuthPageLayout'

function RegisterPage() {
<<<<<<< Updated upstream
=======
  const navigate = useNavigate()
  const location = useLocation()
  const { register } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')

  const handleRegister = async (payload) => {
    try {
      setIsSubmitting(true)
      setServerError('')
      const response = await register(payload)
      const fallbackPath =
        response.data?.role === 'attendee'
          ? '/attendee/registrations'
          : response.data?.role === 'organizer'
            ? '/organizer'
            : '/home'
      navigate(location.state?.from || fallbackPath)
    } catch (error) {
      setServerError(error.response?.data?.message || 'Failed to create account.')
    } finally {
      setIsSubmitting(false)
    }
  }

>>>>>>> Stashed changes
  return (
    <AuthPageLayout
      badgeText="Start for free"
      heading="Create your FestFlow account."
      subText="Set up your account to explore events, save favorites, and get QR passes after registration."
    >
      <AuthForm mode="register" />
    </AuthPageLayout>
  )
}

export default RegisterPage
