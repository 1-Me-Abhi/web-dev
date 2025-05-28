import { useState, useEffect, useRef } from 'react';

const reviews = [
  { 
    name: "Alice Thompson",
    location: "New York, USA",
    text: "Absolutely loved my stay! The service was impeccable and the room exceeded all my expectations. The staff went above and beyond to make my anniversary special.",
    rating: 5,
    image: "https://source.unsplash.com/random/100x100/?portrait-woman-1",
    date: "June 15, 2023"
  },
  { 
    name: "John Martinez",
    location: "London, UK",
    text: "Perfect weekend retreat with amazing amenities. The spa treatments were exceptional and the dining experience was unforgettable. Will definitely return!",
    rating: 5,
    image: "https://source.unsplash.com/random/100x100/?portrait-man-1",
    date: "July 3, 2023"
  },
  { 
    name: "Sarah Chen",
    location: "Toronto, Canada",
    text: "The attention to detail throughout the hotel was remarkable. From the welcome amenities to the turndown service, everything was thoughtfully executed.",
    rating: 4,
    image: "https://source.unsplash.com/random/100x100/?portrait-woman-2",
    date: "August 22, 2023"
  },
  { 
    name: "Michael Okonkwo",
    location: "Sydney, Australia",
    text: "This hotel has the most breathtaking views I've ever experienced. The infinity pool overlooking the city skyline was the highlight of our honeymoon.",
    rating: 5,
    image: "https://source.unsplash.com/random/100x100/?portrait-man-2",
    date: "September 10, 2023"
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const intervalRef = useRef(null);
  
  // Handle autoplay
  useEffect(() => {
    if (isAutoplay) {
      intervalRef.current = setInterval(() => {
        setCurrent(prev => (prev + 1) % reviews.length);
      }, 5000);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoplay]);
  
  // Pause autoplay on hover
  const handleMouseEnter = () => setIsAutoplay(false);
  const handleMouseLeave = () => setIsAutoplay(true);
  
  // Handle manual navigation
  const goToSlide = (index) => {
    setCurrent(index);
    // Reset timer when manually navigating
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (isAutoplay) {
      intervalRef.current = setInterval(() => {
        setCurrent(prev => (prev + 1) % reviews.length);
      }, 5000);
    }
  };
  
  const nextSlide = () => goToSlide((current + 1) % reviews.length);
  const prevSlide = () => goToSlide((current - 1 + reviews.length) % reviews.length);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-100 to-white">
      <div className="container mx-auto px-4">
        <h3 className="text-4xl font-bold mb-4 text-center">What Our Guests Say</h3>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Hear from our satisfied guests about their memorable experiences at HotelEase.</p>
        
        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Testimonial slides */}
          <div className="overflow-hidden rounded-xl shadow-lg">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {reviews.map((review, index) => (
                <div key={index} className="min-w-full p-8 bg-white">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="flex-shrink-0">
                      <img 
                        src={review.image} 
                        alt={`${review.name} portrait`} 
                        className="w-20 h-20 rounded-full object-cover border-4 border-blue-100 shadow"
                      />
                    </div>
                    
                    <div className="flex-grow">
                      {/* Rating stars */}
                      <div className="flex mb-3">
                        {[...Array(5)].map((_, i) => (
                          <span 
                            key={i} 
                            className={`material-symbols-outlined text-xl ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          >
                            star
                          </span>
                        ))}
                      </div>
                      
                      <p className="text-gray-700 text-lg mb-4 italic">"{review.text}"</p>
                      
                      <div className="mt-4">
                        <h5 className="font-semibold text-xl">{review.name}</h5>
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="material-symbols-outlined text-base mr-1">location_on</span>
                          {review.location}
                          <span className="mx-2">•</span>
                          <span>{review.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="Previous testimonial"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="Next testimonial"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
          
          {/* Indicator dots */}
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, index) => (
              <button 
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${current === index ? 'bg-blue-600 w-6' : 'bg-gray-300'}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 