import { Route, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import LandingPage from './pages/public/LandingPage'
import HomePage from './pages/public/HomePage'
import EventPage from './pages/public/EventPage'
import LoginPage from './pages/public/LoginPage'
import RegisterPage from './pages/public/RegisterPage'
import SimplePage from './pages/public/SimplePage'

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/events/:id" element={<EventPage />} />
        <Route
          path="/explore"
          element={
            <SimplePage
              title="Explore Events"
              description="This page will show nearby fests, pop-ups, and campus events in the next phase."
            />
          }
        />
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="/register"
          element={<RegisterPage />}
        />
        <Route
          path="*"
          element={
            <SimplePage
              title="Page Not Found"
              description="This route is not ready yet. Head back to the landing page and continue building."
            />
          }
        />
      </Routes>
    </AppLayout>
  )
}

export default App
