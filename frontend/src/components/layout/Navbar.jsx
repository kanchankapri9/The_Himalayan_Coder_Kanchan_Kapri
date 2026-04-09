import { Link, useLocation } from 'react-router-dom'
import { AppBar, Button, Container, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../context/AuthContext'
import { useThemeMode } from '../../context/ThemeModeContext'
import './Navbar.css'

function Navbar() {
  const location = useLocation()
  const { user, isAuthenticated, logout } = useAuth()
  const { mode, toggleMode } = useThemeMode()
  const isLandingPage = location.pathname === '/'
  const isHomePage = location.pathname === '/home'
  const isAttendee = user?.role === 'attendee'
  const isOrganizer = user?.role === 'organizer'

  return (
    <AppBar position="sticky" elevation={0} className="navbar">
      <Container maxWidth="xl">
        <Toolbar disableGutters className="navbar__toolbar">
          <Link to="/" className="navbar__brand">
            <Typography className="navbar__title">FestFlow</Typography>
          </Link>

          <div className="navbar__actions">
            <IconButton
              onClick={toggleMode}
              className="navbar__theme-toggle"
              aria-label="Toggle dark and light mode"
            >
              <FontAwesomeIcon icon={mode === 'dark' ? faSun : faMoon} />
            </IconButton>

            {isLandingPage && !isAuthenticated ? (
              <Button variant="contained" component={Link} to="/home" className="navbar__button">
                Get Started
              </Button>
            ) : null}

            {isHomePage && !isAuthenticated ? (
              <Stack direction="row" spacing={1.2}>
                <Button variant="text" component={Link} to="/login" className="navbar__text-button">
                  Log in
                </Button>
                <Button variant="contained" component={Link} to="/register" className="navbar__button">
                  Sign up
                </Button>
              </Stack>
            ) : null}

            {!isLandingPage && !isHomePage && !isAuthenticated ? (
              <Stack direction="row" spacing={1.2}>
                <Button variant="text" component={Link} to="/home" className="navbar__text-button">
                  Home
                </Button>
                <Button variant="contained" component={Link} to="/register" className="navbar__button">
                  Sign up
                </Button>
              </Stack>
            ) : null}

            {isAuthenticated ? (
              <Stack direction="row" spacing={1.2} alignItems="center">
                {isAttendee ? (
                  <>
                    <Button variant="text" component={Link} to="/attendee/registrations" className="navbar__text-button">
                      Dashboard
                    </Button>
                    <Button variant="text" component={Link} to="/attendee/passes" className="navbar__text-button">
                      Passes
                    </Button>
                  </>
                ) : null}

                {isOrganizer ? (
                  <>
                    <Button variant="text" component={Link} to="/organizer" className="navbar__text-button">
                      Dashboard
                    </Button>
                    <Button variant="text" component={Link} to="/organizer/events" className="navbar__text-button">
                      My Events
                    </Button>
                  </>
                ) : null}

                <Typography className="navbar__user-name">{user?.name}</Typography>
                <Button variant="text" onClick={logout} className="navbar__text-button">
                  Logout
                </Button>
              </Stack>
            ) : null}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
