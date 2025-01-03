import React from 'react';
import { Link } from 'react-router-dom';
import { DarkMode } from './shared/DarkMode';

export const Header = () => {
  return (
    <header className="bg-white shadow-2xl">
      <div className="flex flex-wrap justify-between items-center w-full px-4 sm:px-8 lg:px-20 h-16 sm:h-20">
        {/* Logo */}
        <div className="text-xl sm:text-2xl lg:text-3xl font-bold">CAR RENTAL</div>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex gap-4 lg:gap-16 items-center font-semibold">
          <Link to="/" className="hover:text-blue-500 transition-colors">Home</Link>
          <Link to="car" className="hover:text-blue-500 transition-colors">Cars</Link>
          <Link to="/aboutus" className="hover:text-blue-500 transition-colors">About</Link>
          <Link to="/contact" className="hover:text-blue-500 transition-colors">Contact</Link>
        </nav>

        {/* Utilities */}
        <div className="flex items-center gap-4 sm:gap-10">
          <DarkMode />
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="flex sm:hidden bg-gray-100 w-full p-2 justify-around text-sm font-semibold">
        <Link to="/" className="hover:text-blue-500 transition-colors">Home</Link>
        <Link to="car" className="hover:text-blue-500 transition-colors">Cars</Link>
        <Link to="/aboutus" className="hover:text-blue-500 transition-colors">About</Link>
        <Link to="/book" className="hover:text-blue-500 transition-colors">Booking</Link>
      </nav>
    </header>
  );
};
