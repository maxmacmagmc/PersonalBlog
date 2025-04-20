import { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex items-center justify-between py-2 px-6 bg-white border-b">
      <a href="/" className="text-2xl font-bold">
        Wutt Seang<span className="text-blue-500">.</span>
      </a>
      <div className="hidden md:flex space-x-4">
        <a href="/login" className="px-9 py-2 rounded-full border">
          Log in
        </a>
        <a
          href="/signup"
          className="px-8 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition-colors"
        >
          Sign up
        </a>
      </div>
      {/* Hamburger Menu for mobile */}
      <button 
        className="md:hidden" 
        onClick={toggleMenu}
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 right-6 bg-white border rounded-lg shadow-md w-48">
          <a
            href="/login"
            className="block px-6 py-2 text-gray-700 hover:bg-gray-100"
          >
            Log in
          </a>
          <a
            href="/signup"
            className="block px-6 py-2 text-gray-700 hover:bg-gray-100"
          >
            Sign up
          </a>
        </div>
      )}
    </nav>
  );
}

export { NavBar };
