const router = require('express').Router();
const { register, login } = require('../controllers/authcontroller');


router.post('/register', register);
router.post('/login', login);   


// Export the router
module.exports = router;