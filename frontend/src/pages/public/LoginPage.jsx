import AuthForm from '../../components/auth/AuthForm'
import AuthPageLayout from '../../components/auth/AuthPageLayout'

function LoginPage() {
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
