import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // Start the animation when component mounts
    setIsVisible(true);
  }, []);

  return (
    <section className="relative h-[80vh] overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')`,
          filter: `brightness(${theme === 'dark' ? 0.6 : 0.7})`
        }}
      />
      
      {/* Dark mode overlay with different opacity based on theme */}
      <div className={`absolute inset-0 bg-black ${theme === 'dark' ? 'bg-opacity-50' : 'bg-opacity-30'} transition-opacity duration-300`}></div>
      
      {/* Content with animations */}
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center p-8 rounded-lg max-w-xl transition-transform hover:scale-105 duration-300">
          <h2 className="text-5xl font-bold mb-4 text-white">Discover Your Next Stay</h2>
          <p className="mb-8 text-white text-lg">Luxury, comfort, and convenience at your fingertips</p>
          <a 
            href="#booking" 
            className="btn-primary px-8 py-3 rounded-full font-semibold inline-block transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            Book Now
          </a>
        </div>
      </div>
    </section>
  );
} 