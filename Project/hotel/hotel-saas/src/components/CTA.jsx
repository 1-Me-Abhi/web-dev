import { useState, useEffect } from 'react';

export default function CTA() {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 12,
    minutes: 30,
    seconds: 0
  });
  
  const [isVisible, setIsVisible] = useState(false);
  
  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            } else {
              hours = 23;
              if (days > 0) {
                days -= 1;
              } else {
                // Reset countdown when it reaches zero
                days = 3;
                hours = 12;
                minutes = 30;
                seconds = 0;
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Intersection observer for reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById('cta-section');
    if (element) observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section 
      id="cta-section"
      className="py-20 bg-blue-600 text-white relative overflow-hidden"
      style={{ 
        backgroundImage: `url('https://source.unsplash.com/1600x900/?luxury-hotel-lobby')`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-blue-900 bg-opacity-80 backdrop-blur-sm"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'}`}>
          <h4 className="text-4xl font-bold mb-6">Limited Time Special Offer</h4>
          <p className="text-xl mb-8">Book your luxury getaway today and receive a complimentary spa treatment and room upgrade!</p>
          
          {/* Countdown timer */}
          <div className="flex justify-center gap-4 mb-10">
            {Object.entries(timeLeft).map(([key, value]) => (
              <div key={key} className="flex flex-col items-center">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg w-20 h-20 flex items-center justify-center mb-2">
                  <span className="text-3xl font-bold">{value.toString().padStart(2, '0')}</span>
                </div>
                <span className="text-sm capitalize">{key}</span>
              </div>
            ))}
          </div>
          
          <a 
            href="#booking" 
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium overflow-hidden bg-white text-blue-600 rounded-full transition-all hover:bg-opacity-90"
          >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-600 rounded-full group-hover:w-56 group-hover:h-56"></span>
            <span className="relative group-hover:text-white transition-colors duration-300">Book Now & Save 20%</span>
          </a>
          
          <p className="mt-4 text-sm opacity-80">Offer valid for bookings made in the next 3 days. Terms and conditions apply.</p>
        </div>
      </div>
    </section>
  );
} 