const { Sequelize } = require('sequelize');

// For SQLite (in-memory or file based)
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'   // or ':memory:' for purely in-memory
});

module.exports = sequelize;
