import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const ParentNav = () => {
  return (
    <>
        <Navbar />
        <Outlet />
        {/* <br /><br /><br /><br /><br /><br /><br />
        <Footer /> */}
    </>
  )
}

export default ParentNav
