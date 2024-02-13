import React, { useEffect } from 'react'
import {Outlet} from 'react-router-dom'
import Nav from './navbar/Nav'
const Dashboard = () => {
 
  
  return (
    <>
    <Nav/>
    <Outlet/>
    </>
  )
}

export default Dashboard