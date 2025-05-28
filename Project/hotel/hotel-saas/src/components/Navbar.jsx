import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import ProfileDropdown from './auth/ProfileDropdown';
import { useNavigate, useLocation, Link } from 'react-router-dom';

export default function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, [setIsAuthenticated]);

  const handleNavClick = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      navigate('/');
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className="relative flex justify-between items-center p-4 shadow-md z-50 bg-nav text-primary transition-colors duration-300">
      <button onClick={() => handleNavClick('/')} className="flex items-center">
        <h1 className="text-2xl font-bold text-accent">HotelEase</h1>
      </button>
      
      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6 items-center">
        <li>
          <button 
            onClick={() => handleNavClick('/')}
            className={`transition-colors ${isActive('/') ? 'font-semibold text-accent' : 'text-primary hover:text-accent'}`}
          >
            Home
          </button>
        </li>
        <li>
          <button 
            onClick={() => handleNavClick('/rooms')}
            className={`transition-colors ${isActive('/rooms') ? 'font-semibold text-accent' : 'text-primary hover:text-accent'}`}
          >
            Rooms
          </button>
        </li>
        <li>
          <button 
            onClick={() => handleNavClick('/about')}
            className={`transition-colors ${isActive('/about') ? 'font-semibold text-accent' : 'text-primary hover:text-accent'}`}
          >
            About
          </button>
        </li>
        <li>
          <button 
            onClick={() => handleNavClick('/contact')}
            className={`transition-colors ${isActive('/contact') ? 'font-semibold text-accent' : 'text-primary hover:text-accent'}`}
          >
            Contact
          </button>
        </li>
        {/* Auth Buttons or Profile Dropdown */}
        <li>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleNavClick('/dashboard')}
                className={`transition-colors ${isActive('/dashboard') ? 'font-semibold text-accent' : 'text-primary hover:text-accent'}`}
              >
                Dashboard
              </button>
              <ProfileDropdown user={user} onLogout={handleLogout} />
            </div>
          ) : (
            <div className="flex rounded-lg overflow-hidden border border-accent">
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 bg-transparent text-accent hover:bg-accent hover:text-white transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="px-4 py-2 bg-accent text-white hover:bg-accent-dark transition-colors"
              >
                Sign Up
              </button>
            </div>
          )}
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden text-primary hover:text-accent transition-colors"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-nav shadow-md transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      >
        <ul className="py-2">
          <li>
            <button 
              onClick={() => handleNavClick('/')}
              className={`block w-full text-left px-4 py-2 transition-colors ${isActive('/') ? 'font-semibold text-accent bg-secondary' : 'text-primary hover:text-accent hover:bg-secondary'}`}
            >
              Home
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleNavClick('/rooms')}
              className={`block w-full text-left px-4 py-2 transition-colors ${isActive('/rooms') ? 'font-semibold text-accent bg-secondary' : 'text-primary hover:text-accent hover:bg-secondary'}`}
            >
              Rooms
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleNavClick('/about')}
              className={`block w-full text-left px-4 py-2 transition-colors ${isActive('/about') ? 'font-semibold text-accent bg-secondary' : 'text-primary hover:text-accent hover:bg-secondary'}`}
            >
              About
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleNavClick('/contact')}
              className={`block w-full text-left px-4 py-2 transition-colors ${isActive('/contact') ? 'font-semibold text-accent bg-secondary' : 'text-primary hover:text-accent hover:bg-secondary'}`}
            >
              Contact
            </button>
          </li>
          {/* Auth Buttons or Profile Options for Mobile */}
          <li className="px-4 py-2">
            {isAuthenticated ? (
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white">
                    {user?.email ? user.email[0].toUpperCase() : 'U'}
                  </div>
                  <span>{user?.email}</span>
                </div>
                <button
                  onClick={() => handleNavClick('/dashboard')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => {
                    navigate('/login');
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full py-2 text-center bg-transparent text-accent hover:bg-accent hover:text-white transition-colors rounded-lg border border-accent"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate('/signup');
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full py-2 text-center bg-accent text-white hover:bg-accent-dark transition-colors rounded-lg"
                >
                  Sign Up
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
} 