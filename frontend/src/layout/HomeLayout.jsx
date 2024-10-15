import React from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Outlet } from 'react-router-dom'

export const HomeLayout = () => {
  return (
    <div className='text-black'> 
      <Header/>
      <div className='min-h-96'>
        <Outlet />
      </div>
      <Footer/>
    </div>
  )
}
