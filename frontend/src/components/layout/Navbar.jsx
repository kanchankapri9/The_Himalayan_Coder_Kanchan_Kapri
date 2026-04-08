import { Link } from 'react-router-dom'
import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material'
import './Navbar.css'

function Navbar() {
  return (
    <AppBar position="sticky" elevation={0} className="navbar">
      <Container maxWidth="xl">
        <Toolbar disableGutters className="navbar__toolbar">
          <Link to="/" className="navbar__brand">
            <Typography className="navbar__title">FestFlow</Typography>
          </Link>

          <Button variant="contained" component={Link} to="/register" className="navbar__button">
            Get Started
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
