const {sequelize} = require('sequelize');

const db = new sequelize('sqlite::memory:');

module.exports = db;
