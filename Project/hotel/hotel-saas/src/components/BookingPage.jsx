import { useState, useEffect } from 'react';
import api from '../api/apiService';
import './BookingPage.css';

export default function BookingPage({ roomId }) {
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    name: '',
    email: '',
    phone: ''
  });
  
  // Fetch room data if roomId is provided
  useEffect(() => {
    const fetchRoomData = async () => {
      if (!roomId) return;
      
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
    
    fetchRoomData();
  }, [roomId]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.checkIn || !formData.checkOut || !formData.name || !formData.email) {
      setError('Please fill in all required fields');
      return;
    }
    
    try {
      setLoading(true);
      
      // Prepare booking data
      const bookingData = {
        roomId: roomId,
        ...formData,
        totalPrice: room ? (room.price + 40) : 0, // Base price plus fees
        status: 'confirmed'
      };
      
      // Submit booking
      await api.bookings.createBooking(bookingData);
      
      // Redirect to confirmation page (you could also show a success message)
      window.location.href = '#booking-confirmation';
      
    } catch (err) {
      setError('Failed to complete booking. Please try again.');
      console.error('Error creating booking:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="booking-page">
        <div className="loading-spinner"></div>
        <p className="text-center">Loading booking information...</p>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="booking-page">
        <div className="error-message">
          <h2>Error</h2>
          <p>{error}</p>
          <button className="btn-primary" onClick={() => window.history.back()}>
            Go Back
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="booking-page">
      <h1>Complete Your Booking</h1>
      
      {/* Room summary if a room is selected */}
      {room && (
        <div className="room-summary">
          <img 
            src={room.image || room.galleryImages?.[0]} 
            alt={room.name} 
            className="room-image" 
          />
          <div className="room-details">
            <h2>{room.name}</h2>
            <p className="room-location">Downtown, Main Area</p>
            <div className="room-rating">
              <span className="stars">{'★'.repeat(Math.round(room.rating))}</span>
              <span className="rating-number">{room.rating}/5</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="booking-container">
        {/* Booking form */}
        <div className="booking-form-container">
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-section">
              <h3>Your Stay Details</h3>
              
              <div className="form-group">
                <label htmlFor="checkIn">Check-in Date*</label>
                <input
                  type="date"
                  id="checkIn"
                  name="checkIn"
                  className="form-control"
                  value={formData.checkIn}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="checkOut">Check-out Date*</label>
                <input
                  type="date"
                  id="checkOut"
                  name="checkOut"
                  className="form-control"
                  value={formData.checkOut}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="guests">Number of Guests</label>
                <select
                  id="guests"
                  name="guests"
                  className="form-control"
                  value={formData.guests}
                  onChange={handleInputChange}
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                </select>
              </div>
            </div>
            
            <div className="form-section">
              <h3>Your Information</h3>
              
              <div className="form-group">
                <label htmlFor="name">Full Name*</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <button type="submit" className="btn-primary btn-block">
              Complete Booking
            </button>
          </form>
        </div>
        
        {/* Booking summary */}
        <div className="booking-summary">
          <h3>Booking Summary</h3>
          
          <div className="summary-details">
            <div className="summary-item">
              <span>Room Rate</span>
              <span>${room ? room.price : 0}</span>
            </div>
            
            <div className="summary-item">
              <span>Cleaning Fee</span>
              <span>$25</span>
            </div>
            
            <div className="summary-item">
              <span>Service Fee</span>
              <span>$15</span>
            </div>
          </div>
          
          <div className="summary-total">
            <span>Total</span>
            <span>${room ? (room.price + 40) : 0}</span>
          </div>
          
          <p className="price-notes">
            Prices are shown in USD and include all applicable taxes
          </p>
        </div>
      </div>
    </div>
  );
} 