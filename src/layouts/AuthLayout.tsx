import { Outlet } from "react-router-dom"
import { CustomBox } from "../components"

const AuthLayout = () => {
  return (
    <CustomBox display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f3f3f3">
      <Outlet />
    </CustomBox>
  )
}

export default AuthLayout