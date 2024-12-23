import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { DarkMode } from './shared/DarkMode';


export const Header = () => {
  const navigate=useNavigate()
  return (
    <header className="header">
      <div className='flex justify-between items-center w-full px-20 h-24 shadow-2xl'>
      
      <div className="text-3xl font-bold">CAR RENTAL</div>

      <nav className="flex gap-16 place-items-end font-semibold">
       
          <Link to="/">Home</Link>
          <Link to="user/cars">Cars</Link>
          <Link to="/about">About</Link>
          <Link to="/booking">Booking</Link>
        
      </nav>

      <div className='flex items-center gap-10'>
        <DarkMode/>
       
        </div>
    </div>
    </header>
   
  );
};


