import { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import CTA from "./components/CTA";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import Rooms from "./components/Rooms";
import RoomDetails from "./components/RoomDetails";
import ThemeToggle from "./components/ThemeToggle";
import BookingPage from "./components/BookingPage";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsConditions from "./components/TermsConditions";
import RoomSearch from "./components/RoomSearch";
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [roomId, setRoomId] = useState(null);

  // Handle URL hash changes for navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        // Check if it's a room details page
        if (hash.startsWith('#room/')) {
          const id = hash.split('/')[1];
          setRoomId(id);
          setCurrentSection('room-details');
        } 
        // Check if it's a booking page
        else if (hash.startsWith('#booking/')) {
          const id = hash.split('/')[1];
          setRoomId(id);
          setCurrentSection('booking');
        }
        // General booking page without a specific room
        else if (hash === '#booking') {
          setCurrentSection('booking');
          setRoomId(null);
        }
        else {
          // Remove the # at the beginning
          setCurrentSection(hash.substring(1));
          setRoomId(null);
        }
      } else {
        setCurrentSection('home');
        setRoomId(null);
      }
    };

    // Call once on mount
    handleHashChange();

    // Set up event listener
    window.addEventListener('hashchange', handleHashChange);

    // Clean up
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Render different sections based on currentSection state
  const renderSection = () => {
    switch(currentSection) {
      case 'rooms':
        return <Rooms />;
      case 'room-details':
        return <RoomDetails roomId={roomId} />;
      case 'booking':
        return <BookingPage roomId={roomId} />;
      case 'about':
        return <AboutUs />;
      case 'contact':
        return <Contact />;
      case 'privacy':
        return <PrivacyPolicy />;
      case 'terms':
        return <TermsConditions />;
      case 'home':
      default:
        return (
          <>
            <Hero />
            <RoomSearch />
            <Features />
            <CTA />
            <Testimonials />
          </>
        );
    }
  };

  return (
    <ThemeProvider>
      <div className="bg-primary text-primary min-h-screen transition-colors duration-300">
        <Navbar />
        {renderSection()}
        <Footer />
        <ThemeToggle />
      </div>
    </ThemeProvider>
  );
}

export default App;
