import axios from 'axios';

// Base API URLs
const API_BASE_URL = 'https://hotels-api.academlo.tech/api/v1'; // Using a public hotel API for demonstration

// Mock data for when API is unavailable
const MOCK_HOTELS = [
  {
    id: 1,
    name: "Luxury Grand Hotel",
    location: "New York",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Experience luxury in the heart of Manhattan with stunning city views.",
    amenities: ["Free WiFi", "Pool", "Spa", "Gym", "Restaurant", "Room Service", "Concierge", "Bar"],
    rooms: [
      {
        id: 101,
        name: "Deluxe King Room",
        price: 350,
        description: "Spacious room with king-sized bed and city view",
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        amenities: ["King Bed", "City View", "Mini Bar", "Free WiFi"],
        status: "available",
        galleryImages: [
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
          "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        ]
      },
      {
        id: 102,
        name: "Executive Suite",
        price: 550,
        description: "Luxury suite with separate living area and panoramic view",
        image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        amenities: ["King Bed", "Panoramic View", "Living Area", "Jacuzzi", "Free WiFi"],
        status: "available",
        galleryImages: [
          "https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
          "https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Seaside Resort & Spa",
    location: "Miami",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1360&q=80",
    description: "Beachfront resort with luxury amenities and stunning ocean views.",
    amenities: ["Free WiFi", "Beach Access", "Spa", "Pool", "Restaurant", "Fitness Center"],
    rooms: [
      {
        id: 201,
        name: "Ocean View Room",
        price: 280,
        description: "Comfortable room with a beautiful ocean view",
        image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        amenities: ["Queen Bed", "Ocean View", "Balcony", "Free WiFi"],
        status: "available",
        galleryImages: [
          "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
          "https://images.unsplash.com/photo-1594560913036-d15f23f8a52c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
        ]
      },
      {
        id: 202,
        name: "Beachfront Villa",
        price: 620,
        description: "Private villa with direct beach access and personal butler",
        image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1225&q=80",
        amenities: ["King Bed", "Private Beach", "Butler Service", "Private Pool", "Free WiFi"],
        status: "booked",
        galleryImages: [
          "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1225&q=80",
          "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
          "https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Mountain Lodge Retreat",
    location: "Aspen",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Cozy mountain lodge surrounded by nature and hiking trails.",
    amenities: ["Free WiFi", "Fireplace", "Hiking Trails", "Restaurant", "Bar"],
    rooms: [
      {
        id: 301,
        name: "Rustic Cabin",
        price: 220,
        description: "Charming cabin with mountain views and fireplace",
        image: "https://images.unsplash.com/photo-1551927411-95e412943b58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1049&q=80",
        amenities: ["Queen Bed", "Mountain View", "Fireplace", "Free WiFi"],
        status: "available",
        galleryImages: [
          "https://images.unsplash.com/photo-1551927411-95e412943b58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1049&q=80",
          "https://images.unsplash.com/photo-1587023568809-d648331a25a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
          "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
        ]
      }
    ]
  }
];

// Mock user data
const MOCK_USER = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  token: "mock-auth-token"
};

// Mock bookings data
const MOCK_BOOKINGS = [
  {
    id: 1,
    userId: 1,
    hotelId: 1,
    roomId: 102,
    checkIn: "2023-12-15",
    checkOut: "2023-12-20",
    guests: 2,
    totalPrice: 2750,
    status: "confirmed",
    createdAt: "2023-11-01T12:30:45Z"
  }
];

// Create axios instance with defaults
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 15000
});

// Add request interceptor for authentication
apiClient.interceptors.request.use(
  config => {
    // Get token from localStorage or other storage
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    // Handle 401 Unauthorized errors (token expired)
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Refresh token logic would go here
        // const refreshToken = localStorage.getItem('refresh_token');
        // const response = await apiClient.post('/auth/refresh', { refreshToken });
        // localStorage.setItem('auth_token', response.data.token);
        
        // Retry the original request with new token
        // return apiClient(originalRequest);
      } catch (refreshError) {
        // Handle refresh token failure - redirect to login, etc.
        console.error('Token refresh failed:', refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// API endpoints mapping for the hotels-api.academlo.tech service
export const api = {
  // Auth endpoints
  auth: {
    login: async (credentials) => {
      try {
        // Try API call first
        const response = await apiClient.post('/users/login', credentials);
        return response.data;
      } catch (error) {
        console.warn('API call failed, using mock data');
        // Return mock data if API call fails
        if (credentials.email === MOCK_USER.email && credentials.password === "password") {
          return { user: MOCK_USER, token: MOCK_USER.token };
        }
        throw new Error("Invalid credentials");
      }
    },
    register: async (userData) => {
      try {
        const response = await apiClient.post('/users/signup', userData);
        return response.data;
      } catch (error) {
        console.warn('API call failed, using mock data');
        // Simulate registration success
        return { 
          user: { ...MOCK_USER, ...userData },
          token: MOCK_USER.token
        };
      }
    },
    logout: async () => {
      // This API might not have a dedicated logout endpoint
      localStorage.removeItem('auth_token');
      return { success: true, message: 'Logged out successfully' };
    }
  },
  
  // Hotels endpoints
  hotels: {
    getHotels: async (params) => {
      try {
        const response = await apiClient.get('/hotels', { params });
        return response.data.results || response.data;
      } catch (error) {
        console.warn('API call failed, using mock data');
        // Return mock hotels
        let filteredHotels = [...MOCK_HOTELS];
        
        // Apply params filtering (simplified version)
        if (params?.search) {
          const search = params.search.toLowerCase();
          filteredHotels = filteredHotels.filter(hotel => 
            hotel.name.toLowerCase().includes(search) || 
            hotel.location.toLowerCase().includes(search)
          );
        }
        
        return filteredHotels;
      }
    },
    getHotelById: async (id) => {
      try {
        const response = await apiClient.get(`/hotels/${id}`);
        return response.data;
      } catch (error) {
        console.warn('API call failed, using mock data');
        // Find hotel by ID in mock data
        const hotel = MOCK_HOTELS.find(h => h.id.toString() === id.toString());
        if (hotel) {
          return hotel;
        }
        throw new Error(`Hotel with ID ${id} not found`);
      }
    }
  },
  
  // Rooms endpoints - adapting to the API structure
  rooms: {
    getRooms: async (params) => {
      try {
        // This API might provide rooms through hotels
        const response = await apiClient.get('/hotels', { params });
        
        // Extract rooms from all hotels
        let allRooms = [];
        if (response.data.results) {
          response.data.results.forEach(hotel => {
            if (hotel.rooms) {
              const roomsWithHotelInfo = hotel.rooms.map(room => ({
                ...room,
                hotelName: hotel.name,
                hotelId: hotel.id,
                location: hotel.location,
                // Map API fields to our expected structure
                id: room.id,
                name: room.name || `Room at ${hotel.name}`,
                price: room.price || 0,
                rating: hotel.rating || 4.0,
                image: room.image || hotel.image,
                description: room.description || `Room at ${hotel.name}`,
                amenities: room.amenities || hotel.amenities,
                available: room.status !== 'booked'
              }));
              allRooms = [...allRooms, ...roomsWithHotelInfo];
            }
          });
        }
        
        return allRooms;
      } catch (error) {
        console.warn('API call failed, using mock data');
        
        // Extract all rooms from mock hotels
        let allRooms = [];
        MOCK_HOTELS.forEach(hotel => {
          if (hotel.rooms) {
            const roomsWithHotelInfo = hotel.rooms.map(room => ({
              ...room,
              hotelName: hotel.name,
              hotelId: hotel.id,
              location: hotel.location,
              id: room.id,
              name: room.name || `Room at ${hotel.name}`,
              price: room.price || 0,
              rating: hotel.rating || 4.0,
              image: room.image || hotel.image,
              description: room.description || `Room at ${hotel.name}`,
              amenities: room.amenities || hotel.amenities,
              available: room.status !== 'booked'
            }));
            allRooms = [...allRooms, ...roomsWithHotelInfo];
          }
        });
        
        // Apply filtering based on params
        if (params) {
          if (params.minPrice) {
            allRooms = allRooms.filter(room => room.price >= params.minPrice);
          }
          if (params.maxPrice) {
            allRooms = allRooms.filter(room => room.price <= params.maxPrice);
          }
          if (params.available) {
            allRooms = allRooms.filter(room => room.available);
          }
          
          // Sorting
          if (params.sortBy) {
            switch(params.sortBy) {
              case 'price-low':
                allRooms.sort((a, b) => a.price - b.price);
                break;
              case 'price-high':
                allRooms.sort((a, b) => b.price - a.price);
                break;
              case 'rating':
                allRooms.sort((a, b) => b.rating - a.rating);
                break;
              default:
                // Default sorting
                break;
            }
          }
        }
        
        return allRooms;
      }
    },
    getRoomById: async (id) => {
      try {
        // The API might not have a direct endpoint for rooms by ID
        // We need to find the room within a hotel
        const [hotelId, roomId] = id.toString().split('-');
        
        if (hotelId && roomId) {
          const response = await apiClient.get(`/hotels/${hotelId}`);
          if (response.data && response.data.rooms) {
            const room = response.data.rooms.find(r => r.id.toString() === roomId);
            if (room) {
              return {
                ...room,
                hotelName: response.data.name,
                hotelId: response.data.id,
                location: response.data.location,
                // Map API fields to our expected structure
                id: room.id,
                name: room.name || `Room at ${response.data.name}`,
                price: room.price || 0,
                rating: response.data.rating || 4.0,
                image: room.image || response.data.image,
                description: room.description || `Room at ${response.data.name}`,
                amenities: room.amenities || response.data.amenities,
                available: room.status !== 'booked',
                galleryImages: [room.image || response.data.image]
              };
            }
          }
        }
        
        // If we can't find the room or the ID format is wrong, try a direct API call
        // This might not work with the current API but we include it for completeness
        const response = await apiClient.get(`/rooms/${id}`);
        return response.data;
      } catch (error) {
        console.warn('API call failed, using mock data');
        
        // Find room in mock data
        for (const hotel of MOCK_HOTELS) {
          if (hotel.rooms) {
            const room = hotel.rooms.find(r => r.id.toString() === id.toString());
            if (room) {
              return {
                ...room,
                hotelName: hotel.name,
                hotelId: hotel.id,
                location: hotel.location,
                id: room.id,
                name: room.name || `Room at ${hotel.name}`,
                price: room.price || 0,
                rating: hotel.rating || 4.0,
                image: room.image || hotel.image,
                description: room.description || `Room at ${hotel.name}`,
                amenities: room.amenities || hotel.amenities,
                available: room.status !== 'booked',
                galleryImages: room.galleryImages || [room.image || hotel.image]
              };
            }
          }
        }
        
        throw new Error(`Room with ID ${id} not found`);
      }
    },
    getRoomRates: async (roomId, params) => {
      try {
        // Try to get room data first for price information
        const room = await api.rooms.getRoomById(roomId);
        
        if (!room) {
          throw new Error(`Room with ID ${roomId} not found`);
        }
        
        // Create a simple rate object based on the room price
        const baseRate = {
          id: "rate1",
          name: "Standard Rate",
          description: "Our best flexible rate",
          price: room.price,
          currency: params.currency || "USD",
          cancellationPolicy: "Free cancellation until 24 hours before check-in",
          mealPlan: "Breakfast included",
          paymentOptions: ["Pay at hotel", "Pay now"]
        };
        
        // Add a discounted rate
        const discountRate = {
          id: "rate2",
          name: "Non-refundable Rate",
          description: "Best price, non-refundable",
          price: Math.round(room.price * 0.9), // 10% discount
          currency: params.currency || "USD",
          cancellationPolicy: "Non-refundable",
          mealPlan: "Room only",
          paymentOptions: ["Pay now"]
        };
        
        // Return an array of rate options
        return [baseRate, discountRate];
      } catch (error) {
        console.warn('API call failed, using mock data');
        
        // Find room in mock data first
        let room = null;
        
        for (const hotel of MOCK_HOTELS) {
          if (hotel.rooms) {
            const foundRoom = hotel.rooms.find(r => r.id.toString() === roomId.toString());
            if (foundRoom) {
              room = foundRoom;
              break;
            }
          }
        }
        
        if (!room) {
          // If room not found, return default rates
          console.warn(`Room with ID ${roomId} not found, returning default rates`);
          return [
            {
              id: "rate1",
              name: "Standard Rate",
              description: "Our best flexible rate",
              price: 299,
              currency: params.currency || "USD",
              cancellationPolicy: "Free cancellation until 24 hours before check-in",
              mealPlan: "Breakfast included",
              paymentOptions: ["Pay at hotel", "Pay now"]
            },
            {
              id: "rate2",
              name: "Non-refundable Rate",
              description: "Best price, non-refundable",
              price: 269,
              currency: params.currency || "USD",
              cancellationPolicy: "Non-refundable",
              mealPlan: "Room only",
              paymentOptions: ["Pay now"]
            }
          ];
        }
        
        // Create a simple rate object based on the room price
        const baseRate = {
          id: "rate1",
          name: "Standard Rate",
          description: "Our best flexible rate",
          price: room.price,
          currency: params.currency || "USD",
          cancellationPolicy: "Free cancellation until 24 hours before check-in",
          mealPlan: "Breakfast included",
          paymentOptions: ["Pay at hotel", "Pay now"]
        };
        
        // Add a discounted rate
        const discountRate = {
          id: "rate2",
          name: "Non-refundable Rate",
          description: "Best price, non-refundable",
          price: Math.round(room.price * 0.9), // 10% discount
          currency: params.currency || "USD",
          cancellationPolicy: "Non-refundable",
          mealPlan: "Room only",
          paymentOptions: ["Pay now"]
        };
        
        // Return an array of rate options
        return [baseRate, discountRate];
      }
    }
  },
  
  // Bookings endpoints
  bookings: {
    createBooking: async (bookingData) => {
      try {
        const response = await apiClient.post('/bookings', bookingData);
        return response.data;
      } catch (error) {
        console.warn('API call failed, using mock data');
        
        // Create a new booking with mock data
        const newBooking = {
          id: MOCK_BOOKINGS.length + 1,
          userId: 1, // Assume logged in user
          ...bookingData,
          status: "confirmed",
          createdAt: new Date().toISOString()
        };
        
        MOCK_BOOKINGS.push(newBooking);
        return newBooking;
      }
    },
    getUserBookings: async () => {
      try {
        const response = await apiClient.get('/bookings');
        return response.data;
      } catch (error) {
        console.warn('API call failed, using mock data');
        return MOCK_BOOKINGS;
      }
    },
    getBookingById: async (id) => {
      try {
        const response = await apiClient.get(`/bookings/${id}`);
        return response.data;
      } catch (error) {
        console.warn('API call failed, using mock data');
        
        // Find booking by ID
        const booking = MOCK_BOOKINGS.find(b => b.id.toString() === id.toString());
        if (booking) {
          return booking;
        }
        throw new Error(`Booking with ID ${id} not found`);
      }
    },
    cancelBooking: async (id) => {
      try {
        const response = await apiClient.post(`/bookings/${id}/cancel`);
        return response.data;
      } catch (error) {
        console.warn('API call failed, using mock data');
        
        // Find booking and update status
        const booking = MOCK_BOOKINGS.find(b => b.id.toString() === id.toString());
        if (booking) {
          booking.status = "cancelled";
          return { success: true, booking };
        }
        throw new Error(`Booking with ID ${id} not found`);
      }
    }
  }
};

export default api; 