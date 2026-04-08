import { createTheme } from '@mui/material/styles'

export function createAppTheme(mode = 'dark') {
  const isDark = mode === 'dark'

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? '#b8c0ff' : '#5b67d8',
        dark: isDark ? '#8f99ea' : '#3e49ba',
        light: isDark ? '#dce0ff' : '#dfe2ff',
      },
      secondary: {
        main: isDark ? '#ffffff' : '#1f2333',
        dark: isDark ? '#d8d8de' : '#0f1322',
        light: '#ffffff',
      },
      background: {
        default: isDark ? '#171717' : '#f5f7ff',
        paper: isDark ? '#202022' : '#ffffff',
      },
      text: {
        primary: isDark ? '#f6f7fb' : '#181c28',
        secondary: isDark ? 'rgba(255,255,255,0.64)' : 'rgba(24,28,40,0.68)',
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
}
