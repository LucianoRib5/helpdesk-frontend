import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f3f3f3">
      <Outlet />
    </Box>
  )
}

export default AuthLayout