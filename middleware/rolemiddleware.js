module.exports = (requiredRole) => {
    return (req, res, next) => {
        
        if (!requiredRole.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        next();
    };
}

// middleware/roleMiddleware.js
module.exports = (roles = []) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
};
