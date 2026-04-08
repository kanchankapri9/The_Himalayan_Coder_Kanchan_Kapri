import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'
import './AuthPageLayout.css'

function AuthPageLayout({ children, badgeText, heading, subText }) {
  return (
    <section className="auth-layout">
      <div className="auth-layout__shell">
        <div className="auth-layout__content">
          <div className="auth-layout__topbar">
            <Link to="/" className="auth-layout__brand">
              <span className="auth-layout__brand-dot" />
              <span>FestFlow</span>
            </Link>

            <div className="auth-layout__links">
              <Link to="/">Home</Link>
              <Link to="/register">Join</Link>
            </div>
          </div>

          <div className="auth-layout__main">
            <div className="auth-layout__left">
              <Typography className="auth-layout__badge">{badgeText}</Typography>
              <Typography variant="h2" className="auth-layout__heading">
                {heading}
              </Typography>
              <Typography className="auth-layout__subtext">{subText}</Typography>
              {children}
            </div>

            <div className="auth-layout__right">
              <div className="auth-layout__curve auth-layout__curve--top" />
              <div className="auth-layout__curve auth-layout__curve--middle" />
              <div className="auth-layout__image-glow" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AuthPageLayout
