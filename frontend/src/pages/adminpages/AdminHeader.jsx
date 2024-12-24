import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { DarkMode } from '../../components/shared/DarkMode';
import { CircleUser } from 'lucide-react';


export const AdminHeader = () => {
  const navigate=useNavigate()
  return (
    <header className="header">
      <div className='flex justify-between items-center w-full px-20 h-24 shadow-2xl'>
      <Link to={"/"}>
      <div className="text-3xl font-bold">CAR RENTAL</div></Link>

      <nav className="flex gap-16 items-center font-semibold">
      <Link to="/home">Home</Link>
          <Link to="admin/carlist">Cars</Link>
          <Link to="/users">Users</Link>
          
          <Link to="/admin/offices">Office</Link>
        
      </nav>

      <div className='flex items-center gap-10'>
       <DarkMode/>
       <Link to={"admin/profile"}>
       <CircleUser/>
       </Link>
        </div>
    </div>
    </header>
   
  );
};




