const express = require('express');
const router = express.Router();
const {
  getFacilities,
  getFacility,
  createFacility,
  updateFacility,
  deleteFacility
} = require('../controllers/facilityController');

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(getFacilities)
  .post(protect, authorize('admin'), createFacility);

router
  .route('/:id')
  .get(getFacility)
  .put(protect, authorize('admin'), updateFacility)
  .delete(protect, authorize('admin'), deleteFacility);

module.exports = router;
