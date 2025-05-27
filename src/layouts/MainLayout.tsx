import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <div>
      <header>Navbar</header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
