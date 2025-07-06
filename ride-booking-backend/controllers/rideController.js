const Ride = require('../models/Ride');
const User = require('../models/User');


exports.requestRide = async (req, res) => {
    const { pickup_location, drop_location, ride_type } = req.body;
    const passenger_id = req.user.id;

    try {
        const ride = await Ride.create({ pickup_location, drop_location, ride_type, passenger_id });
        res.status(201).json(ride);
    } catch (err) {
        res.status(500).json({ error: 'Ride request failed', details: err });
    }
};


exports.getMyRides = async (req, res) => {
    try {
        const rides = await Ride.findAll({
            where: { passenger_id: req.user.id },
            include: ['Driver']
        });
        res.json(rides);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching rides' });
    }
};


exports.getRideById = async (req, res) => {
    try {
        const ride = await Ride.findByPk(req.params.id, { include: ['Driver', 'Passenger'] });
        if (!ride) return res.status(404).json({ error: 'Ride not found' });
        res.json(ride);
    } catch (err) {
        res.status(500).json({ error: 'Error retrieving ride' });
    }
};


exports.getAvailableRides = async (req, res) => {
    try {
        const rides = await Ride.findAll({
            where: { status: 'requested' },
            include: ['Passenger']
        });
        res.json(rides);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching available rides' });
    }
};


exports.acceptRide = async (req, res) => {
    const ride = await Ride.findByPk(req.params.id);
    if (!ride || ride.status !== 'requested') return res.status(400).json({ error: 'Ride not available' });

    ride.driver_id = req.user.id;
    ride.status = 'accepted';
    await ride.save();

    res.json({ message: 'Ride accepted', ride });
};


exports.rejectRide = async (req, res) => {
    const ride = await Ride.findByPk(req.params.id);
    if (!ride || ride.status !== 'requested') return res.status(400).json({ error: 'Ride not available' });

    ride.status = 'rejected';
    await ride.save();

    res.json({ message: 'Ride rejected' });
};


exports.updateRideStatus = async (req, res) => {
    const { status } = req.body;
    const allowedStatuses = ['in_progress', 'completed'];
    if (!allowedStatuses.includes(status)) return res.status(400).json({ error: 'Invalid status update' });

    const ride = await Ride.findByPk(req.params.id);
    if (!ride || ride.driver_id !== req.user.id) return res.status(403).json({ error: 'Not your ride' });

    ride.status = status;
    await ride.save();
    res.json({ message: 'Status updated', ride });
};
