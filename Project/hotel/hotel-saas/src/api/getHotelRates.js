import { api } from './apiService';

// Original sample rates data for fallback if API fails
const sampleRates = [
  {
    id: 'rate-1',
    name: 'Standard Rate',
    price: 250,
    currency: 'USD',
    cancellationPolicy: 'Free cancellation up to 24 hours before check-in',
    mealPlan: 'Breakfast included',
    paymentOptions: ['Pay at hotel', 'Pay now']
  },
  {
    id: 'rate-2',
    name: 'Non-refundable Rate',
    price: 220,
    currency: 'USD',
    cancellationPolicy: 'Non-refundable',
    mealPlan: 'Room only',
    paymentOptions: ['Pay now']
  },
  {
    id: 'rate-3',
    name: 'Premium Rate',
    price: 300,
    currency: 'USD',
    cancellationPolicy: 'Free cancellation up to 48 hours before check-in',
    mealPlan: 'All-inclusive',
    paymentOptions: ['Pay at hotel', 'Pay now']
  }
];

/**
 * Get hotel rates for a specific hotel
 * @param {Object} params Parameters for the hotel rates request
 * @param {string} params.hotelKey Hotel identifier
 * @param {string} params.checkIn Check-in date (YYYY-MM-DD)
 * @param {string} params.checkOut Check-out date (YYYY-MM-DD)
 * @param {number} params.rooms Number of rooms (default: 1)
 * @param {number} params.adults Number of adults (default: 2)
 * @param {number} params.children Number of children (default: 0)
 * @param {string} params.currency Currency code (default: USD)
 * @returns {Promise<Array>} Promise resolving to array of rate options
 */
export const getHotelRates = async (params = {}) => {
  // Prepare parameters with defaults
  const queryParams = {
    rooms: params.rooms || 1,
    adults: params.adults || 2,
    children: params.children || 0,
    currency: params.currency || 'USD',
    ...params
  };

  try {
    if (!params.hotelKey) {
      console.warn('Hotel key is missing, using sample rates');
      return sampleRates.map(rate => ({
        ...rate,
        currency: params.currency || 'USD'
      }));
    }

    // Fetch hotel rates using the main API service
    const rates = await api.rooms.getRoomRates(params.hotelKey, queryParams);
    return rates;
  } catch (error) {
    console.error('Error fetching hotel rates:', error);
    // Return sample rates instead of re-throwing the error
    console.warn('Falling back to sample rates data');
    return sampleRates.map(rate => ({
      ...rate,
      currency: params.currency || 'USD'
    }));
  }
};

export default getHotelRates; 