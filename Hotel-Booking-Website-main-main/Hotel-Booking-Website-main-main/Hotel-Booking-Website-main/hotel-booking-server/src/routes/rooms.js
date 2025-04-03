const express = require('express');
const router = express.Router();
const {
  getRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
  searchRooms
} = require('../controllers/roomController');

const { protect, authorize } = require('../middleware/auth');

// Include reviews router
const reviewRouter = require('./reviews');

// Re-route into other resource routers
router.use('/:roomId/reviews', reviewRouter);

router.route('/search').get(searchRooms);

router
  .route('/')
  .get(getRooms)
  .post(protect, authorize('admin'), createRoom);

router
  .route('/:id')
  .get(getRoom)
  .put(protect, authorize('admin'), updateRoom)
  .delete(protect, authorize('admin'), deleteRoom);

module.exports = router;
