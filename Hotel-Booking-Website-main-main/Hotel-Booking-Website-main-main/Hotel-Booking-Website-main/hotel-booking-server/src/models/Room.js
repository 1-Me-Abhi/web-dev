const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a room name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price per night']
  },
  capacity: {
    type: Number,
    required: [true, 'Please add room capacity']
  },
  size: {
    type: Number,
    required: [true, 'Please add room size in square meters']
  },
  features: {
    type: [String],
    required: true
  },
  images: {
    type: [String],
    default: ['default-room.jpg']
  },
  availability: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Cascade delete bookings when a room is deleted
RoomSchema.pre('remove', async function(next) {
  await this.model('Booking').deleteMany({ room: this._id });
  next();
});

// Reverse populate with bookings
RoomSchema.virtual('bookings', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'room',
  justOne: false
});

// Reverse populate with reviews
RoomSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'room',
  justOne: false
});

module.exports = mongoose.model('Room', RoomSchema); 