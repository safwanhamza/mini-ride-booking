const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { requireRole } = require('../middleware/requireRole');
const userController = require('../controllers/userController');

router.patch('/availability', auth, requireRole('driver'), userController.toggleAvailability);

module.exports = router;
