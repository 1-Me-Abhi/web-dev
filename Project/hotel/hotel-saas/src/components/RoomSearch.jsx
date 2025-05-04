import { useState } from 'react';

export default function RoomSearch() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Get tomorrow's date for min check-in date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];
  
  // Get date 14 days from now for default check-out suggestion
  const defaultCheckout = new Date();
  defaultCheckout.setDate(defaultCheckout.getDate() + 14);
  const defaultCheckoutStr = defaultCheckout.toISOString().split('T')[0];
  
  // Format date display
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  // Handle check-in date change
  const handleCheckInChange = (e) => {
    const newCheckIn = e.target.value;
    setCheckIn(newCheckIn);
    
    // If check-out date is before new check-in date, update it
    if (checkOut && new Date(checkOut) <= new Date(newCheckIn)) {
      const nextDay = new Date(newCheckIn);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOut(nextDay.toISOString().split('T')[0]);
    }
  };
  
  // Handle search submission
  const handleSearch = () => {
    // Redirect to rooms page with search parameters
    window.location.href = "#rooms";
  };

  return (
    <section className="max-w-5xl mx-auto -mt-16 relative z-20 px-4">
      <div className="bg-white rounded-xl shadow-xl p-6 hover-lift">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full">
            <h3 className="text-xl font-semibold mb-6">Find Your Perfect Room</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Check-in date */}
              <div className="relative">
                <label htmlFor="check-in" className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                <input
                  type="date"
                  id="check-in"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min={tomorrowStr}
                  value={checkIn}
                  onChange={handleCheckInChange}
                  required
                />
                {!checkIn && (
                  <div className="absolute right-3 top-9 text-gray-400 pointer-events-none">
                    <span className="material-symbols-outlined">calendar_month</span>
                  </div>
                )}
              </div>
              
              {/* Check-out date */}
              <div className="relative">
                <label htmlFor="check-out" className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                <input
                  type="date"
                  id="check-out"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min={checkIn || tomorrowStr}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  required
                />
                {!checkOut && (
                  <div className="absolute right-3 top-9 text-gray-400 pointer-events-none">
                    <span className="material-symbols-outlined">calendar_month</span>
                  </div>
                )}
              </div>
              
              {/* Guests */}
              <div>
                <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button 
                    type="button"
                    className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 transition-colors"
                    onClick={() => setGuests(prev => Math.max(1, prev - 1))}
                    aria-label="Decrease guests"
                  >
                    <span className="material-symbols-outlined text-sm">remove</span>
                  </button>
                  <input
                    type="number"
                    id="guests"
                    className="w-full text-center border-0 focus:ring-0"
                    min="1"
                    max="10"
                    value={guests}
                    onChange={(e) => setGuests(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                    required
                  />
                  <button 
                    type="button"
                    className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 transition-colors"
                    onClick={() => setGuests(prev => Math.min(10, prev + 1))}
                    aria-label="Increase guests"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                  </button>
                </div>
              </div>
              
              {/* Rooms */}
              <div>
                <label htmlFor="rooms" className="block text-sm font-medium text-gray-700 mb-1">Rooms</label>
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button 
                    type="button"
                    className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 transition-colors"
                    onClick={() => setRooms(prev => Math.max(1, prev - 1))}
                    aria-label="Decrease rooms"
                  >
                    <span className="material-symbols-outlined text-sm">remove</span>
                  </button>
                  <input
                    type="number"
                    id="rooms"
                    className="w-full text-center border-0 focus:ring-0"
                    min="1"
                    max="5"
                    value={rooms}
                    onChange={(e) => setRooms(Math.max(1, Math.min(5, parseInt(e.target.value) || 1)))}
                    required
                  />
                  <button 
                    type="button"
                    className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 transition-colors"
                    onClick={() => setRooms(prev => Math.min(5, prev + 1))}
                    aria-label="Increase rooms"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-auto">
            <button
              type="button"
              onClick={handleSearch}
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              disabled={!checkIn || !checkOut}
            >
              <span className="material-symbols-outlined">search</span>
              Search Availability
            </button>
          </div>
        </div>
        
        {/* Special offers - toggleable */}
        <div className="mt-4 border-t pt-4">
          <button
            type="button"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <span className="material-symbols-outlined text-sm">
              {isSearchOpen ? 'expand_less' : 'expand_more'}
            </span>
            <span className="font-medium">
              {isSearchOpen ? 'Hide special offers' : 'View special offers & discounts'}
            </span>
          </button>
          
          {isSearchOpen && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in-up">
              <div className="p-3 border border-blue-200 bg-blue-50 rounded-lg flex items-center gap-3">
                <span className="material-symbols-outlined text-blue-600">discount</span>
                <div>
                  <p className="font-medium">Book Early & Save 15%</p>
                  <p className="text-sm text-gray-600">Book 30 days in advance</p>
                </div>
              </div>
              <div className="p-3 border border-green-200 bg-green-50 rounded-lg flex items-center gap-3">
                <span className="material-symbols-outlined text-green-600">event_available</span>
                <div>
                  <p className="font-medium">Weekend Special 10% Off</p>
                  <p className="text-sm text-gray-600">Friday-Sunday stays</p>
                </div>
              </div>
              <div className="p-3 border border-purple-200 bg-purple-50 rounded-lg flex items-center gap-3">
                <span className="material-symbols-outlined text-purple-600">loyalty</span>
                <div>
                  <p className="font-medium">Stay 5+ Nights, Get 20% Off</p>
                  <p className="text-sm text-gray-600">On longer stays</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 