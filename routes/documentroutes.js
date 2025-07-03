const router = require('express').Router();
const auth = require('../middleware/authmiddleware');
const {create, edit, view, list, delete: del} = require('../controllers/documentcontroller');


router.post('/', auth, create);
router.put('/:id', auth, edit);
router.get('/:id', auth, view);
router.get('/', auth, list);
router.delete('/:id', auth, del);

// Export the router
module.exports = router;