import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DarkMode } from '../../components/shared/DarkMode';
import { CircleUser } from 'lucide-react';

export const AdminHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="header bg-white shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-5 md:px-20 py-4 md:h-24">
        {/* Logo */}
        <Link to="/">
          <div className="text-2xl md:text-3xl font-bold">CAR RENTAL</div>
        </Link>

        {/* Navigation */}
        <nav className="flex flex-col md:flex-row gap-4 md:gap-16 items-center font-semibold mt-4 md:mt-0">
          <Link to="/homme" className="hover:text-blue-600">Home</Link>
          <Link to="admin/carlist" className="hover:text-blue-600">Cars</Link>
          <Link to="/users" className="hover:text-blue-600">Users</Link>
          <Link to="/admin/offices" className="hover:text-blue-600">Office</Link>
        </nav>

        {/* Dark Mode and Profile */}
        <div className="flex gap-6 items-center mt-4 md:mt-0">
          <DarkMode />
          <Link to="admin/profile" className="hover:text-blue-600">
            <CircleUser className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </header>
  );
};
