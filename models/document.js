const {DataTypes} = require('sequelize');
const db = require('../config/db');

const Document = db.define('Document', {
    title : {
        type: DataTypes.STRING(255), allowNull: false
    },
    content : {
        type: DataTypes.TEXT, allowNull: false
    },
    ownerId : {
        type: DataTypes.INTEGER, allowNull: false,
    },
}, {
    timestamps: true,}

);

Document.belongsTo(User, {
    foreignKey: 'ownerId'});

module.exports = Document;