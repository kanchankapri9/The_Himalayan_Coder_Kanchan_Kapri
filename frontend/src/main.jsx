import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { SavedEventsProvider } from './context/SavedEventsContext'
import { ThemeModeProvider } from './context/ThemeModeContext'
import './styles/global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeModeProvider>
      <AuthProvider>
        <SavedEventsProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SavedEventsProvider>
      </AuthProvider>
    </ThemeModeProvider>
  </StrictMode>,
)
