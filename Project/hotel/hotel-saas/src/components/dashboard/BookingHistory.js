import { useState } from 'react';

export default function BookingHistory() {
  const [activeTab, setActiveTab] = useState('upcoming');

  // Mock data - replace with actual API calls
  const bookings = {
    upcoming: [
      {
        id: 1,
        roomType: 'Deluxe Suite',
        checkIn: '2024-04-15',
        checkOut: '2024-04-20',
        guests: 2,
        status: 'confirmed',
        totalPrice: 1200
      },
      {
        id: 2,
        roomType: 'Executive Room',
        checkIn: '2024-05-01',
        checkOut: '2024-05-03',
        guests: 1,
        status: 'pending',
        totalPrice: 450
      }
    ],
    past: [
      {
        id: 3,
        roomType: 'Standard Room',
        checkIn: '2024-01-10',
        checkOut: '2024-01-12',
        guests: 2,
        status: 'completed',
        totalPrice: 300
      }
    ]
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Booking History</h2>
      
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'upcoming'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Upcoming Bookings
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'past'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Past Bookings
        </button>
      </div>

      <div className="space-y-4">
        {bookings[activeTab].map((booking) => (
          <div
            key={booking.id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{booking.roomType}</h3>
                <p className="text-gray-600">
                  {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusBadgeClass(
                  booking.status
                )}`}
              >
                {booking.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Guests</p>
                <p className="font-medium">{booking.guests}</p>
              </div>
              <div>
                <p className="text-gray-600">Total Price</p>
                <p className="font-medium">${booking.totalPrice}</p>
              </div>
            </div>

            {activeTab === 'upcoming' && (
              <div className="mt-4 flex space-x-3">
                <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg">
                  Modify Booking
                </button>
                <button className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg">
                  Cancel Booking
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 