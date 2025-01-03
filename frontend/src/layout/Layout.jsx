import React from 'react'

import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Outlet } from 'react-router-dom'
import TopBar from '../components/TopBar'
import { Home } from '../pages/userpages/Home'


export const Layout = () => {
  return (
    <div className='text-black'> 
    <TopBar />
   
      <nav><Header/></nav>
   
      <div className='min-h-96'>
        <Outlet />
      </div>
      <Footer/>
    </div>
   
  )
}
