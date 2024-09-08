import { Outlet } from "react-router-dom"
import Header from "../Layout/Header"

function MainRout() {
  return (
    <>
        <Header/>
        <Outlet />
    </>
  )
}

export default MainRout