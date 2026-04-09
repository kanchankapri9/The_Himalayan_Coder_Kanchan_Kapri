import AuthForm from '../../components/auth/AuthForm'
import AuthPageLayout from '../../components/auth/AuthPageLayout'

function LoginPage() {
<<<<<<< Updated upstream
=======
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')

  const handleLogin = async (payload) => {
    try {
      setIsSubmitting(true)
      setServerError('')
      const response = await login(payload)
      const fallbackPath =
        response.data?.role === 'attendee'
          ? '/attendee/registrations'
          : response.data?.role === 'organizer'
            ? '/organizer'
            : '/home'
      navigate(location.state?.from || fallbackPath)
    } catch (error) {
      setServerError(error.response?.data?.message || 'Failed to log in.')
    } finally {
      setIsSubmitting(false)
    }
  }

>>>>>>> Stashed changes
  return (
    <AuthPageLayout
      badgeText="Welcome back"
      heading="Log in and jump back in."
      subText="Continue exploring local fests, track your registrations, and manage event check-ins from your dashboard."
    >
      <AuthForm mode="login" />
    </AuthPageLayout>
  )
}

export default LoginPage
