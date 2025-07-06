const User = require('../models/User');


exports.toggleAvailability = async (req, res) => {
    const user = await User.findByPk(req.user.id);
    if (!user || user.type !== 'driver') return res.status(403).json({ error: 'Only drivers can update availability' });

    user.availability_status = user.availability_status === 'available' ? 'unavailable' : 'available';
    await user.save();

    res.json({ message: 'Availability updated', status: user.availability_status });
};
