const express = require('express');
const router = express.Router();
const {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
  getUserBookings,
  cancelBooking,
  confirmBooking,
  completeBooking
} = require('../controllers/bookingController');

const { protect, authorize } = require('../middleware/auth');

router.route('/user').get(protect, getUserBookings);

router
  .route('/')
  .get(protect, authorize('admin'), getBookings)
  .post(protect, createBooking);

router
  .route('/:id')
  .get(protect, getBooking)
  .put(protect, authorize('admin'), updateBooking)
  .delete(protect, authorize('admin'), deleteBooking);

router.route('/:id/cancel').patch(protect, cancelBooking);
router.route('/:id/confirm').patch(protect, authorize('admin'), confirmBooking);
router.route('/:id/complete').patch(protect, authorize('admin'), completeBooking);

module.exports = router;
