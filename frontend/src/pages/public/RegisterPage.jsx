import AuthForm from '../../components/auth/AuthForm'
import AuthPageLayout from '../../components/auth/AuthPageLayout'

function RegisterPage() {
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
