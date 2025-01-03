import React from 'react';
import { Link } from 'react-router-dom';
import { DarkMode } from '../../components/shared/DarkMode';
import { CircleUser, ShoppingBag } from 'lucide-react';

export const UserHeader = () => {
  return (
    <header className="header bg-white shadow-md">
      <div className="flex justify-between items-center w-full px-6 md:px-20 h-16 md:h-24">
        {/* Logo */}
        <Link to={"user/signin"}>
          <div className="text-xl md:text-3xl font-bold">CAR RENTAL</div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex gap-8 items-center font-semibold">
          <Link to="/home" className="hover:text-blue-500 transition duration-200">Home</Link>
          <Link to="/cars" className="hover:text-blue-500 transition duration-200">Cars</Link>
          <Link to="/booking" className="hover:text-blue-500 transition duration-200">Booking</Link>
          <Link to="/my-order" className="hover:text-blue-500 transition duration-200">My Order</Link>
        </nav>

        {/* Icons and Dark Mode Toggle */}
        <div className="flex items-center gap-6">
          <DarkMode />
          <Link to={'/user/cart'} className="hover:text-blue-500 transition duration-200">
            <ShoppingBag />
          </Link>
          <Link to={"user/profile"} className="hover:text-blue-500 transition duration-200">
            <CircleUser />
          </Link>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="block md:hidden">
          {/* Add a menu icon for mobile view */}
          <button className="text-xl">
            <span className="material-icons">menu</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <nav className="md:hidden bg-gray-100 px-4 py-2">
        <Link to="/home" className="block py-2 hover:text-blue-500">Home</Link>
        <Link to="/cars" className="block py-2 hover:text-blue-500">Cars</Link>
        <Link to="/booking" className="block py-2 hover:text-blue-500">Booking</Link>
        <Link to="/my-order" className="block py-2 hover:text-blue-500">My Order</Link>
      </nav>
    </header>
  );
};
