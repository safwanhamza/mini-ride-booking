

const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const { requireRole } = require('../middleware/requireRole');
const rideController = require('../controllers/rideController');


router.use(auth);


router.post('/', requireRole('passenger'), rideController.requestRide);
router.get('/', requireRole('passenger'), rideController.getMyRides);
router.get('/:id', requireRole('passenger'), rideController.getRideById);


router.get('/available', requireRole('driver'), rideController.getAvailableRides);
router.post('/:id/accept', requireRole('driver'), rideController.acceptRide);
router.post('/:id/reject', requireRole('driver'), rideController.rejectRide);
router.patch('/:id/status', requireRole('driver'), rideController.updateRideStatus);

module.exports = router;
