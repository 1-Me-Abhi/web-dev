import { useState, useEffect } from 'react';
import api from '../api/apiService';
import HotelRates from './HotelRates';

// Sample reviews data (in a real app, this would come from an API)
const reviewsData = [
  {
    id: 1,
    author: "Alex Johnson",
    rating: 5,
    date: "2023-10-15",
    comment: "Absolutely loved my stay! The room was clean, spacious and the view was breathtaking. The staff was incredibly helpful and friendly. Will definitely be coming back."
  },
  {
    id: 2,
    author: "Sarah Williams",
    rating: 4,
    date: "2023-09-22",
    comment: "Great room with excellent amenities. The bed was super comfortable and I enjoyed the premium bathroom products. Only downside was some noise from the street."
  },
  {
    id: 3,
    author: "Michael Brown",
    rating: 5,
    date: "2023-08-05",
    comment: "Perfect stay for our anniversary. The room was exactly as pictured and the service was exceptional. Highly recommend the room service breakfast!"
  }
];

// Sample room image gallery
const galleryImages = [
  "https://source.unsplash.com/random/800x600/?hotel-room-1",
  "https://source.unsplash.com/random/800x600/?hotel-bathroom",
  "https://source.unsplash.com/random/800x600/?hotel-view",
  "https://source.unsplash.com/random/800x600/?hotel-bed",
  "https://source.unsplash.com/random/800x600/?hotel-desk"
];

export default function RoomDetails({ roomId }) {
  const [activeImage, setActiveImage] = useState(0);
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch room data when component mounts or roomId changes
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        setLoading(true);
        const roomData = await api.rooms.getRoomById(roomId);
        setRoom(roomData);
        setError(null);
      } catch (err) {
        setError('Failed to load room details. Please try again later.');
        console.error('Error fetching room details:', err);
      } finally {
        setLoading(false);
      }
    };
    
    if (roomId) {
      fetchRoomData();
    }
  }, [roomId]);
  
  // Handle image navigation
  const nextImage = () => {
    if (!room || !room.galleryImages) return;
    setActiveImage(prev => (prev + 1) % room.galleryImages.length);
  };
  
  const prevImage = () => {
    if (!room || !room.galleryImages) return;
    setActiveImage(prev => (prev - 1 + room.galleryImages.length) % room.galleryImages.length);
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <div className="inline-block h-12 w-12 border-4 border-t-accent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg">Loading room details...</p>
        </div>
      </div>
    );
  }
  
  // Error state
  if (error || !room) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-8">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <p className="text-xl mb-4">{error || 'Room not found'}</p>
          <a href="#rooms" className="btn-primary px-4 py-2 rounded inline-block">
            Back to Rooms
          </a>
        </div>
      </div>
    );
  }
  
  // Calculate average rating
  const averageRating = room.reviews && room.reviews.length > 0 
    ? room.reviews.reduce((acc, review) => acc + review.rating, 0) / room.reviews.length 
    : 0;
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb navigation */}
      <div className="mb-6">
        <nav className="text-sm">
          <ol className="flex">
            <li><a href="#" className="text-accent hover:underline">Home</a></li>
            <li><span className="mx-2">/</span></li>
            <li><a href="#rooms" className="text-accent hover:underline">Rooms</a></li>
            <li><span className="mx-2">/</span></li>
            <li className="text-secondary">{room.name}</li>
          </ol>
        </nav>
      </div>
      
      {/* Room title and quick info */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-0">{room.name}</h1>
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="flex items-center">
              <span className="text-yellow-500 mr-1">★</span>
              <span>{room.rating}/5</span>
              {room.reviews && (
                <span className="text-secondary ml-1">({room.reviews.length} reviews)</span>
              )}
            </div>
            <div className="text-2xl font-bold text-accent">${room.price}<span className="text-sm text-secondary">/night</span></div>
          </div>
        </div>
      </div>
      
      {/* Image gallery */}
      {room.galleryImages && room.galleryImages.length > 0 && (
        <div className="mb-10">
          <div className="relative rounded-lg overflow-hidden h-96 bg-gray-100">
            <img 
              src={room.galleryImages[activeImage]} 
              alt={`Room view ${activeImage + 1}`} 
              className="w-full h-full object-cover"
            />
            
            {/* Navigation arrows - only show if more than one image */}
            {room.galleryImages.length > 1 && (
              <>
                <button 
                  onClick={prevImage} 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-70"
                >
                  &#10094;
                </button>
                <button 
                  onClick={nextImage} 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-70"
                >
                  &#10095;
                </button>
              </>
            )}
            
            {/* Image counter */}
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
              {activeImage + 1} / {room.galleryImages.length}
            </div>
          </div>
          
          {/* Thumbnails - only show if more than one image */}
          {room.galleryImages.length > 1 && (
            <div className="mt-4 grid grid-cols-5 gap-2">
              {room.galleryImages.map((image, index) => (
                <div 
                  key={index} 
                  className={`h-20 rounded-lg overflow-hidden cursor-pointer ${index === activeImage ? 'ring-2 ring-accent' : ''}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Main content - 2 columns on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Room description and details */}
        <div className="lg:col-span-2">
          <div className="card p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Room Description</h2>
            <p className="mb-4">{room.description}</p>
            {room.longDescription && (
              <p className="whitespace-pre-line">{room.longDescription}</p>
            )}
          </div>
          
          {/* Amenities */}
          {room.amenities && room.amenities.length > 0 && (
            <div className="card p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
                {room.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <svg className="w-4 h-4 text-accent mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Reviews */}
          {room.reviews && room.reviews.length > 0 && (
            <div className="card p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Guest Reviews</h2>
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span className="font-bold">{averageRating.toFixed(1)}</span>
                  <span className="text-secondary ml-1">({room.reviews.length} reviews)</span>
                </div>
              </div>
              
              <div className="space-y-6">
                {room.reviews.map(review => (
                  <div key={review.id} className="border-b border-border-color pb-6 last:border-0 last:pb-0">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-semibold">{review.author}</h3>
                      <span className="text-secondary text-sm">{review.date}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.rating ? "text-yellow-500" : "text-gray-300"}>★</span>
                      ))}
                    </div>
                    <p className="text-secondary">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Right column - Booking section */}
        <div>
          <div className="card p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Book This Room</h2>
            
            {/* Add the HotelRates component */}
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Available Rates</h3>
              <p className="text-sm text-gray-500 mb-4">Showing rates in Indian Rupees (₹)</p>
              <HotelRates
                hotelKey="g304551-d1759051"
                checkIn="2025-04-25"
                checkOut="2025-04-27"
                currency="INR"
              />
            </div>
          </div>
          
          {/* Booking widget */}
          <div className="card p-6 mb-8">
            <form>
              <div className="mb-4">
                <label htmlFor="check-in" className="block mb-2 font-medium">Check In</label>
                <input 
                  type="date" 
                  id="check-in" 
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-accent" 
                />
              </div>
              <div className="mb-4">
                <label htmlFor="check-out" className="block mb-2 font-medium">Check Out</label>
                <input 
                  type="date" 
                  id="check-out" 
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-accent" 
                />
              </div>
              <div className="mb-4">
                <label htmlFor="guests" className="block mb-2 font-medium">Guests</label>
                <select 
                  id="guests" 
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                </select>
              </div>
              <div className="my-6 border-t border-b border-border-color py-4">
                <div className="flex justify-between mb-2">
                  <span>${room.price} x 1 night</span>
                  <span>${room.price}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Cleaning fee</span>
                  <span>$25</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Service fee</span>
                  <span>$15</span>
                </div>
                <div className="flex justify-between font-bold mt-4 pt-2 border-t border-border-color">
                  <span>Total</span>
                  <span>${room.price + 25 + 15}</span>
                </div>
              </div>
              <button 
                type="submit" 
                className={`w-full py-3 rounded-lg font-semibold ${room.available ? 'btn-primary' : 'btn-disabled'}`}
                disabled={!room.available}
                onClick={() => {
                  if (room.available) {
                    window.location.href = `#booking/${roomId}`;
                  }
                }}
              >
                {room.available ? 'Book Now' : 'Not Available'}
              </button>
            </form>
          </div>
          
          {/* Room Policies */}
          {room.policies && room.policies.length > 0 && (
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4">Room Policies</h2>
              <ul className="space-y-2 text-secondary">
                {room.policies.map((policy, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-accent mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>{policy}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 