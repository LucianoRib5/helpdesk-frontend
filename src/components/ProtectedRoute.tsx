import { Navigate, Outlet } from 'react-router-dom'

const isAuthenticated = () => Boolean(localStorage.getItem('token'))

const ProtectedRoute = () => isAuthenticated() ? <Outlet /> : <Navigate to='/login' replace />

export default ProtectedRoute
