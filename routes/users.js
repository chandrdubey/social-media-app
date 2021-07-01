const router = require('express').Router();
const {checkAdmin} = require('../middlewares');
const usersController = require('../controllers/users');
//const admin_id = 1;


router.post('/signup', usersController.signup);
router.post('/signin', usersController.signin);
router.get('/', usersController.getAllUsers);
router.get('/active', usersController.activeUsers);
router.get('/:user_id', usersController.getUserById);
router.put('/:user_id/delete', usersController.userDelete);
router.delete('/:user_id/delete',checkAdmin, usersController.userDeletePermanent);



module.exports = router;