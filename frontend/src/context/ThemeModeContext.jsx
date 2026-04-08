import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createAppTheme } from '../theme/theme'

const ThemeModeContext = createContext(null)

const STORAGE_KEY = 'festflow-theme-mode'

function getInitialMode() {
  const savedMode = localStorage.getItem(STORAGE_KEY)

  if (savedMode === 'dark' || savedMode === 'light') {
    return savedMode
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeModeProvider({ children }) {
  const [mode, setMode] = useState(getInitialMode)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode)
    document.documentElement.setAttribute('data-theme', mode)
  }, [mode])

  const muiTheme = useMemo(() => createAppTheme(mode), [mode])

  const value = useMemo(
    () => ({
      mode,
      toggleMode: () => {
        setMode((currentMode) => (currentMode === 'dark' ? 'light' : 'dark'))
      },
    }),
    [mode],
  )

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  )
}

export function useThemeMode() {
  const context = useContext(ThemeModeContext)

  if (!context) {
    throw new Error('useThemeMode must be used inside ThemeModeProvider')
  }

  return context
}
