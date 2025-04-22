import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon } from '@heroicons/react/24/outline';

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex items-center justify-between py-2 px-6 bg-white border-b">
      <Link to="/" className="text-2xl font-bold">
        Wutt Seang<span className="text-blue-500">.</span>
      </Link>

      <div className="hidden md:flex space-x-4 items-center">
        <Link to="/" className="text-gray-700 hover:text-blue-500 transition-colors">
          Home
        </Link>
        <Link to="/admin" className="text-gray-700 hover:text-blue-500 transition-colors">
          Admin
        </Link>
        <Link to="/login" className="px-6 py-2 rounded-full border">
          Log in
        </Link>
        <Link
          to="/signup"
          className="px-6 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition-colors"
        >
          Sign up
        </Link>
      </div>

      {/* Hamburger Menu for mobile */}
      <button className="md:hidden" onClick={toggleMenu}>
        <Bars3Icon className="h-6 w-6" />
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 right-6 bg-white border rounded-lg shadow-md w-48 z-50">
          <Link
            to="/"
            className="block px-6 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/admin"
            className="block px-6 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Admin
          </Link>
          <Link
            to="/login"
            className="block px-6 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="block px-6 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Sign up
          </Link>
        </div>
      )}
    </nav>
  );
}

export { NavBar };
