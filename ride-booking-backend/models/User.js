const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.ENUM('passenger', 'driver'), allowNull: false },
    availability_status: {
        type: DataTypes.ENUM('available', 'unavailable'),
        defaultValue: 'available'
    }
});

module.exports = User;
