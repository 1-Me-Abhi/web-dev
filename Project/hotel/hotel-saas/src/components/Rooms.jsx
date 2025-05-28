import React, { useState, useEffect } from 'react';
import './Rooms.css';
import api from '../api/apiService';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filters state
  const [filters, setFilters] = useState({
    sortBy: 'default',
    minPrice: '',
    maxPrice: '',
    available: false
  });

  // Load rooms on component mount
  useEffect(() => {
    loadRooms();
  }, []);

  // Apply filters when they change
  useEffect(() => {
    if (!loading) {
      applyFilters();
    }
  }, [filters]);

  const loadRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch rooms from API
      const data = await api.rooms.getRooms();
      setRooms(data);
      setLoading(false);
    } catch (err) {
      console.error('Error loading rooms:', err);
      setError('Failed to load rooms. Please try again later.');
      setLoading(false);
    }
  };

  const applyFilters = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Create params object with only non-empty values
      const params = {};
      if (filters.minPrice) params.minPrice = Number(filters.minPrice);
      if (filters.maxPrice) params.maxPrice = Number(filters.maxPrice);
      if (filters.available) params.available = true;
      if (filters.sortBy && filters.sortBy !== 'default') params.sortBy = filters.sortBy;
      
      // Fetch filtered rooms from API
      const data = await api.rooms.getRooms(params);
      setRooms(data);
      setLoading(false);
    } catch (err) {
      console.error('Error applying filters:', err);
      setError('Failed to apply filters. Please try again later.');
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading rooms...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={loadRooms} className="retry-btn">Retry</button>
      </div>
    );
  }

  return (
    <div className="rooms-container">
      <h1>Available Rooms</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading rooms...</p>
        </div>
      ) : (
        <>
          {/* Filters */}
          <div className="filters-container">
            <div className="filter-group">
              <label htmlFor="sortBy">Sort by:</label>
              <select 
                id="sortBy" 
                name="sortBy" 
                value={filters.sortBy} 
                onChange={handleFilterChange}
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label htmlFor="minPrice">Min Price:</label>
              <input 
                type="number" 
                id="minPrice" 
                name="minPrice" 
                value={filters.minPrice} 
                onChange={handleFilterChange}
                min="0"
                placeholder="Min"
              />
            </div>
            
            <div className="filter-group">
              <label htmlFor="maxPrice">Max Price:</label>
              <input 
                type="number" 
                id="maxPrice" 
                name="maxPrice" 
                value={filters.maxPrice} 
                onChange={handleFilterChange}
                min="0"
                placeholder="Max"
              />
            </div>
            
            <div className="filter-group checkbox">
              <input 
                type="checkbox" 
                id="available" 
                name="available" 
                checked={filters.available} 
                onChange={handleFilterChange}
              />
              <label htmlFor="available">Available only</label>
            </div>
            
            <button className="clear-filters" onClick={() => {
              setFilters({
                sortBy: 'default',
                minPrice: '',
                maxPrice: '',
                available: false
              });
            }}>
              Clear Filters
            </button>
          </div>
          
          {/* Room listings */}
          <div className="rooms-grid">
            {rooms.length > 0 ? (
              rooms.map(room => (
                <div key={room.id} className={`room-card ${!room.available ? 'unavailable' : ''}`}>
                  <div className="room-image">
                    <img src={room.image} alt={room.name} />
                    {!room.available && <div className="unavailable-tag">Unavailable</div>}
                    <div className="room-price">${room.price}<span>/night</span></div>
                  </div>
                  <div className="room-details">
                    <h2>{room.name}</h2>
                    <div className="room-rating">
                      <span className="stars">{'★'.repeat(Math.round(room.rating))}</span>
                      <span className="rating-number">{room.rating}</span>
                    </div>
                    <p className="room-description">{room.description}</p>
                    <div className="room-amenities">
                      {room.amenities && room.amenities.slice(0, 3).map((amenity, index) => (
                        <span key={index} className="amenity-tag">{amenity}</span>
                      ))}
                      {room.amenities && room.amenities.length > 3 && (
                        <span className="amenity-more">+{room.amenities.length - 3} more</span>
                      )}
                    </div>
                    <div className="room-actions">
                      <a href={`#room/${room.id}`} className="view-details-btn">View Details</a>
                      <button 
                        className="book-now-btn" 
                        disabled={!room.available}
                        onClick={() => {
                          if (room.available) {
                            window.location.href = `#booking/${room.id}`;
                          }
                        }}
                      >
                        {room.available ? 'Book Now' : 'Not Available'}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-rooms">
                <h2>No rooms found</h2>
                <p>Try adjusting your filters to see more results.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Rooms; 