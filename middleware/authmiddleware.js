const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async (req, res, next) => {
    const authHeaders = req.headers.authorization;
    
    if (!authHeaders) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const token = authHeaders.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

// middleware/authMiddleware.js
const axios = require('axios');

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Token required' });

    const token = authHeader.split(' ')[1];

    try {
        const response = await axios.post('http://localhost:4000/validate-token', { token });
        req.user = response.data;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
