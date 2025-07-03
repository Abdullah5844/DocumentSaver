const {DataTypes} = require('sequelize');
const db = require('../config/db');

const User = db.define('User', {
  fullname: {
    type: DataTypes.STRING, allowNull: false},
    email : {
    type: DataTypes.STRING, allowNull: false, unique: true},
    password: {
    type: DataTypes.STRING, allowNull: false},
    role: {
    type: DataTypes.ENUM('user', 'admin'), defaultValue: 'user'},

});

module.exports = User;