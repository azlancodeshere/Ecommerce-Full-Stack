import React from 'react'
import NavBar from '../components/ui/NavBar'
import Footer from '../components/ui/Footer'
import { Outlet } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const MainLayout = ({numCartItems}) => {
  return (
    <>
    <NavBar numCartItems={numCartItems}/>
    <ToastContainer/>
    <Outlet/>
    <Footer/>
    </>

  )
}

export default MainLayout
