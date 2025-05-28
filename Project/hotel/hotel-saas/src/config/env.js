/**
 * Environment variables configuration
 * This file centralizes all environment variables and provides fallbacks
 */

const env = {
  // App configuration
  baseUrl: process.env.REACT_APP_BASE_URL || window.location.origin,
  hotelName: process.env.REACT_APP_HOTEL_NAME || 'HotelEase',
  supportEmail: process.env.REACT_APP_SUPPORT_EMAIL || 'support@hotelease.com',
  
  // API configuration
  apiUrl: process.env.REACT_APP_API_URL || 'https://api.example.com',
  
  // Feature flags
  features: {
    enableBooking: process.env.REACT_APP_ENABLE_BOOKING === 'true',
    enableUserReviews: process.env.REACT_APP_ENABLE_USER_REVIEWS === 'true',
  },
  
  // Firebase configuration
  firebase: {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
  },
  
  // Check if we're running in production environment
  isProduction: process.env.NODE_ENV === 'production',
  
  // Check if we're running in development environment
  isDevelopment: process.env.NODE_ENV === 'development',
};

export default env; 