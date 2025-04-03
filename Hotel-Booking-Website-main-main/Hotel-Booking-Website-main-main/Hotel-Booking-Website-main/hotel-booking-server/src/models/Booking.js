const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  room: {
    type: mongoose.Schema.ObjectId,
    ref: 'Room',
    required: true
  },
  checkInDate: {
    type: Date,
    required: [true, 'Please add a check-in date']
  },
  checkOutDate: {
    type: Date,
    required: [true, 'Please add a check-out date']
  },
  adults: {
    type: Number,
    required: [true, 'Please add number of adults']
  },
  children: {
    type: Number,
    default: 0
  },
  totalPrice: {
    type: Number,
    required: [true, 'Please calculate the total price']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Static method to check room availability
BookingSchema.statics.checkAvailability = async function(roomId, checkInDate, checkOutDate, excludeBookingId = null) {
  const bookings = await this.find({
    room: roomId,
    _id: { $ne: excludeBookingId },
    status: { $nin: ['cancelled'] },
    $or: [
      // Check if the new booking's check-in date falls between an existing booking
      {
        checkInDate: { $lte: checkInDate },
        checkOutDate: { $gt: checkInDate }
      },
      // Check if the new booking's check-out date falls between an existing booking
      {
        checkInDate: { $lt: checkOutDate },
        checkOutDate: { $gte: checkOutDate }
      },
      // Check if the new booking completely encompasses an existing booking
      {
        checkInDate: { $gte: checkInDate },
        checkOutDate: { $lte: checkOutDate }
      }
    ]
  });

  return bookings.length === 0;
};

module.exports = mongoose.model('Booking', BookingSchema); 