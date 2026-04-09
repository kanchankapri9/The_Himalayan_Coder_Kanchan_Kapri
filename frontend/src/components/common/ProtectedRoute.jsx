import { Navigate, useLocation } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import { useAuth } from '../../context/AuthContext'

function ProtectedRoute({ children, allowedRoles = [] }) {
  const location = useLocation()
  const { isAuthenticated, isAuthLoading, user } = useAuth()

  if (isAuthLoading) {
    return <CircularProgress />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/home" replace />
  }

  return children
}

export default ProtectedRoute
