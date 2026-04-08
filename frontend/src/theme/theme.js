import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#b8c0ff',
      dark: '#8f99ea',
      light: '#dce0ff',
    },
    secondary: {
      main: '#ffffff',
      dark: '#d8d8de',
      light: '#ffffff',
    },
    background: {
      default: '#171717',
      paper: '#202022',
    },
    text: {
      primary: '#f6f7fb',
      secondary: 'rgba(255,255,255,0.64)',
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Segoe UI", sans-serif',
    h1: {
      fontSize: '2.8rem',
      fontWeight: 800,
      fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
    },
    h3: {
      fontSize: '1.2rem',
      fontWeight: 600,
      fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
    },
  },
  shape: {
    borderRadius: 16,
  },
})

export default theme
