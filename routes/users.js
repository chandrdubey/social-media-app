const router = require('express').Router();

const usersController = require('../controllers/users');

router.post('/new', usersController.signup);
router.post('/', usersController.getAllUsers);

module.exports = router;