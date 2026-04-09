import { Route, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import LandingPage from './pages/public/LandingPage'
import HomePage from './pages/public/HomePage'
import EventPage from './pages/public/EventPage'
import LoginPage from './pages/public/LoginPage'
import RegisterPage from './pages/public/RegisterPage'
import SimplePage from './pages/public/SimplePage'
import MyRegistrationsPage from './pages/attendee/MyRegistrationsPage'
import SavedEventsPage from './pages/attendee/SavedEventsPage'
import MyPassesPage from './pages/attendee/MyPassesPage'
import PassDetailsPage from './pages/attendee/PassDetailsPage'
import ProtectedRoute from './components/common/ProtectedRoute'
import OrganizerDashboardPage from './pages/organizer/OrganizerDashboardPage'
import MyEventsPage from './pages/organizer/MyEventsPage'
import CreateEventPage from './pages/organizer/CreateEventPage'
import ManageEventPage from './pages/organizer/ManageEventPage'
import EventRegistrationsPage from './pages/organizer/EventRegistrationsPage'
import ApprovalRequestsPage from './pages/organizer/ApprovalRequestsPage'

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
          path="/attendee/registrations"
          element={
            <ProtectedRoute allowedRoles={['attendee']}>
              <MyRegistrationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendee/saved-events"
          element={
            <ProtectedRoute allowedRoles={['attendee']}>
              <SavedEventsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendee/passes"
          element={
            <ProtectedRoute allowedRoles={['attendee']}>
              <MyPassesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendee/passes/:passId"
          element={
            <ProtectedRoute allowedRoles={['attendee']}>
              <PassDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organizer"
          element={
            <ProtectedRoute allowedRoles={['organizer']}>
              <OrganizerDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organizer/events"
          element={
            <ProtectedRoute allowedRoles={['organizer']}>
              <MyEventsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organizer/events/create"
          element={
            <ProtectedRoute allowedRoles={['organizer']}>
              <CreateEventPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organizer/events/:eventId"
          element={
            <ProtectedRoute allowedRoles={['organizer']}>
              <ManageEventPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organizer/events/:eventId/registrations"
          element={
            <ProtectedRoute allowedRoles={['organizer']}>
              <EventRegistrationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organizer/events/:eventId/approvals"
          element={
            <ProtectedRoute allowedRoles={['organizer']}>
              <ApprovalRequestsPage />
            </ProtectedRoute>
          }
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
