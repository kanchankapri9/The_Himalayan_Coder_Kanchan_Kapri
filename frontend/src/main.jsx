import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
<<<<<<< Updated upstream
=======
import { AuthProvider } from './context/AuthContext'
import { SavedEventsProvider } from './context/SavedEventsContext'
>>>>>>> Stashed changes
import { ThemeModeProvider } from './context/ThemeModeContext'
import './styles/global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeModeProvider>
<<<<<<< Updated upstream
      <BrowserRouter>
        <App />
      </BrowserRouter>
=======
      <AuthProvider>
        <SavedEventsProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SavedEventsProvider>
      </AuthProvider>
>>>>>>> Stashed changes
    </ThemeModeProvider>
  </StrictMode>,
)
