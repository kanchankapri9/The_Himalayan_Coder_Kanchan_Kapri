import { Link, useLocation } from 'react-router-dom'
import { AppBar, Button, Container, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../context/AuthContext'
import { useThemeMode } from '../../context/ThemeModeContext'
import './Navbar.css'

function Navbar() {
  const location = useLocation()
  const { mode, toggleMode } = useThemeMode()
  const { isAuthenticated, user, logout } = useAuth()
  const isLandingPage = location.pathname === '/'
  const isHomePage = location.pathname === '/home'

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

            {isLandingPage && (
              <Button variant="contained" component={Link} to="/home" className="navbar__button">
                Get Started
              </Button>
            )}

            {isHomePage && !isAuthenticated && (
              <Stack direction="row" spacing={1.2}>
                <Button variant="text" component={Link} to="/login" className="navbar__text-button">
                  Log in
                </Button>
                <Button variant="contained" component={Link} to="/register" className="navbar__button">
                  Sign up
                </Button>
              </Stack>
            )}

            {!isLandingPage && !isHomePage && !isAuthenticated && (
              <Stack direction="row" spacing={1.2}>
                <Button variant="text" component={Link} to="/home" className="navbar__text-button">
                  Home
                </Button>
                <Button variant="contained" component={Link} to="/register" className="navbar__button">
                  Sign up
                </Button>
              </Stack>
            )}

            {isAuthenticated && (
              <Stack direction="row" spacing={1.2} alignItems="center">
                <Typography className="navbar__user-name">{user?.name}</Typography>
                <Button variant="text" onClick={logout} className="navbar__text-button">
                  Logout
                </Button>
              </Stack>
            )}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
