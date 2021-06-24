const router = require('express').Router();

const usersController = require('../controllers/users');

router.post('/new', usersController.signup);
router.get('/', usersController.getAllUsers);
router.get('/active', usersController.activeUsers);
router.get('/:user_id', usersController.getUserById);
router.put('/:user_id/delete', usersController.userDelete);
router.delete('/:user_id/delete', usersController.userDeletePermanent);

module.exports = router;