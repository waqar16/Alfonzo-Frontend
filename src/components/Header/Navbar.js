import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    const closeMenu = () => {
      setIsMenuOpen(false);
    };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white shadow-md py-4 md:py-6">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to={'/'} title="Home" className="flex items-center rounded outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
              <h1 className="text-2xl font-bold text-gray-900">LOGO</h1>
            </Link >
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="text-gray-900 focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`absolute top-full left-0 w-full bg-white lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} shadow-md`}
          >
            <div className="p-6 space-y-6">
              <Link to={'/profile'} title="Press" className="block text-lg font-semibold text-gray-900 transition hover:text-gray-700" onClick={closeMenu}>Profile</Link>
              <Link to={'/create-document'} title="Press" className="block text-lg font-semibold text-gray-900 transition hover:text-gray-700" onClick={closeMenu}>Create Document</Link>
              <Link to={'/verify-document'} title="Press" className="block text-lg font-semibold text-gray-900 transition hover:text-gray-700" onClick={closeMenu}>Verify Document</Link>
              {/* <Link to={'/profile'} title="Press" className="block text-lg font-semibold text-gray-900 transition hover:text-gray-700">Profile</Link> */}
              {/* <Link to={'/profile'} title="Press" className="block text-lg font-semibold text-gray-900 transition hover:text-gray-700">Profile</Link> */}
              <div className="border-t border-gray-200 pt-4">
                <Link to={'/login'} title="Login" className="block text-lg font-semibold text-gray-900 transition hover:text-gray-700" onClick={closeMenu}>Login</Link>
                <a
                  href="#"
                  title="See Demo"
                  className="block w-full mt-4 py-2 text-center text-lg font-semibold text-gray-900 bg-transparent border border-gray-900 rounded-xl transition hover:bg-gray-900 hover:text-white"
                  onClick={closeMenu}
                >
                  See Demo
                </a>
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-12">
          <Link to={'/profile'} title="Press" className="block text-lg font-semibold text-gray-900 transition hover:text-gray-700">Profile</Link>
              <Link to={'/create-document'} title="Press" className="block text-lg font-semibold text-gray-900 transition hover:text-gray-700">Create Document</Link>
              <Link to={'/verify-document'} title="Press" className="block text-lg font-semibold text-gray-900 transition hover:text-gray-700">Verify Document</Link>
            {/* <a href="#" title="Equipments" className="text-base font-medium text-gray-900 transition hover:text-gray-700">Equipments</a>
            <a href="#" title="FAQs" className="text-base font-medium text-gray-900 transition hover:text-gray-700">FAQs</a> */}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex lg:items-center lg:space-x-10">
            <Link to={'/login'} title="Login" className="text-base font-medium text-gray-900 transition hover:text-gray-700">Login</Link>
            <Link
              to={'/create-document'}
              title="See Demo"
              className="px-5 py-2 text-base font-semibold text-gray-900 border border-gray-900 rounded-xl transition hover:bg-gray-900 hover:text-white"
            >
              See Demo
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
