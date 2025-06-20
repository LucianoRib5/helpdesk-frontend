import { Routes, Route, Navigate } from 'react-router-dom'
import UserRegister from '../pages/UserRegister/UserRegister'
import ProtectedRoute from '../components/ProtectedRoute'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home/Home'
import NotFound from '../pages/NotFound/NotFound'
import Login from '../pages/Login/Login'
import AuthLayout from '../layouts/AuthLayout'
import TicketList from '../pages/TicketList/TicketList'
import TicketDetails from '../pages/TicketDetails/TicketDetails'
import Reports from '../pages/Reports/Reports'
import ManageUsers from '../pages/ManageUsers/ManageUsers'
import AccountSettings from '../pages/AccountSettings/AccountSettings'

const isAuthenticated = () => Boolean(localStorage.getItem('token'))

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={
        isAuthenticated()
          ? <Navigate to='/dashboard' replace />
          : <Navigate to='/login' replace />
      } />
      <Route element={<AuthLayout />}>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<UserRegister />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path='/dashboard' element={<Home />} />
          <Route path='/dashboard/tickets' element={<TicketList />} />
          <Route path='/ticket/:id/details' element={<TicketDetails />} />
          <Route path='/tickets/reports' element={<Reports />} />
          <Route path='/manage-users' element={<ManageUsers />} />
          <Route path='/account-settings' element={<AccountSettings />} />
        </Route>
      </Route>

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
