import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { DarkMode } from '../../components/shared/DarkMode';
import { CircleUser } from 'lucide-react';
import { ShoppingBag } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

export const UserHeader = () => {
  

  return (
    <header className="header">
      <div className='flex justify-between items-center w-full px-20 h-24 shadow-2xl'>
      <Link to={"user/signin"}>
      <div className="text-3xl font-bold">CAR RENTAL</div></Link>

      <nav className="flex gap-16 items-center font-semibold">
      <Link to="/home">Home</Link>
          <Link to="/cars">Cars</Link>
          <Link to="/booking">Booking</Link>
          
          <Link to="/about">About us</Link>
        
      </nav>

      <div className='flex items-center gap-10'>
       <DarkMode/>
                <Link to={'/user/cart'}>
                    <ShoppingBag />
                </Link>
       <Link to={"user/profile"}>
       <CircleUser/>
       </Link>
        </div>
    </div>
    </header>
   
  );
};




