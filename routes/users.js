const router = require('express').Router();

const usersController = require('../controllers/users');

router.post('/new', usersController.signup);
router.get('/', usersController.getAllUsers);
router.get('/active', usersController.activeUsers);
router.get('/:user_id', usersController.getUserById);

module.exports = router;