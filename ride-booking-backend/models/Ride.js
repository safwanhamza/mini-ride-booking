const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Ride = sequelize.define('Ride', {
    pickup_location: { type: DataTypes.STRING, allowNull: false },
    drop_location: { type: DataTypes.STRING, allowNull: false },
    ride_type: { type: DataTypes.ENUM('bike', 'car', 'rickshaw'), allowNull: false },
    status: { type: DataTypes.ENUM('requested', 'accepted', 'in_progress', 'completed', 'rejected'), defaultValue: 'requested' },
});

User.hasMany(Ride, { foreignKey: 'passenger_id', as: 'RequestedRides' });
User.hasMany(Ride, { foreignKey: 'driver_id', as: 'AcceptedRides' });

Ride.belongsTo(User, { foreignKey: 'passenger_id', as: 'Passenger' });
Ride.belongsTo(User, { foreignKey: 'driver_id', as: 'Driver' });

module.exports = Ride;
