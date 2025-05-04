import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function Navbar() {
  const [activePage, setActivePage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  
  // Update the active page based on the current URL hash when component mounts
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (!hash || hash === '#') {
        setActivePage('home');
      } else {
        // Remove the # at the beginning and any potential slash and additional parameters
        const section = hash.substring(1).split('/')[0];
        setActivePage(section);
      }
    };

    // Call once on mount
    handleHashChange();
    
    // Add event listener
    window.addEventListener('hashchange', handleHashChange);
    
    // Clean up
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  
  const handleNavClick = (page) => {
    setActivePage(page);
    setIsMobileMenuOpen(false); // Close mobile menu when a link is clicked
  };
  
  return (
    <nav className="relative flex justify-between items-center p-4 shadow-md z-50 bg-nav text-primary transition-colors duration-300">
      <a href="#" onClick={() => handleNavClick('home')} className="flex items-center">
        <h1 className="text-2xl font-bold text-accent">HotelEase</h1>
      </a>
      
      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6">
        <li>
          <a 
            href="#" 
            className={`transition-colors ${activePage === 'home' ? 'font-semibold text-accent' : 'text-primary hover:text-accent'}`}
            onClick={() => handleNavClick('home')}
          >
            Home
          </a>
        </li>
        <li>
          <a 
            href="#rooms" 
            className={`transition-colors ${activePage === 'rooms' ? 'font-semibold text-accent' : 'text-primary hover:text-accent'}`}
            onClick={() => handleNavClick('rooms')}
          >
            Rooms
          </a>
        </li>
        <li>
          <a 
            href="#about" 
            className={`transition-colors ${activePage === 'about' ? 'font-semibold text-accent' : 'text-primary hover:text-accent'}`}
            onClick={() => handleNavClick('about')}
          >
            About
          </a>
        </li>
        <li>
          <a 
            href="#contact" 
            className={`transition-colors ${activePage === 'contact' ? 'font-semibold text-accent' : 'text-primary hover:text-accent'}`}
            onClick={() => handleNavClick('contact')}
          >
            Contact
          </a>
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
            <a 
              href="#" 
              className={`block px-4 py-2 transition-colors ${activePage === 'home' ? 'font-semibold text-accent bg-secondary' : 'text-primary hover:text-accent hover:bg-secondary'}`}
              onClick={() => handleNavClick('home')}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#rooms" 
              className={`block px-4 py-2 transition-colors ${activePage === 'rooms' ? 'font-semibold text-accent bg-secondary' : 'text-primary hover:text-accent hover:bg-secondary'}`}
              onClick={() => handleNavClick('rooms')}
            >
              Rooms
            </a>
          </li>
          <li>
            <a 
              href="#about" 
              className={`block px-4 py-2 transition-colors ${activePage === 'about' ? 'font-semibold text-accent bg-secondary' : 'text-primary hover:text-accent hover:bg-secondary'}`}
              onClick={() => handleNavClick('about')}
            >
              About
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              className={`block px-4 py-2 transition-colors ${activePage === 'contact' ? 'font-semibold text-accent bg-secondary' : 'text-primary hover:text-accent hover:bg-secondary'}`}
              onClick={() => handleNavClick('contact')}
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
} 