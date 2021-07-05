const router = require('express').Router();
const {checkAdmin} = require('../middlewares');
const usersController = require('../controllers/users');
const passport = require('passport');

router.post('/signup', usersController.signup);
router.post('/signin', usersController.signin);
router.get('/',passport.authenticate('jwt', { session: false }), usersController.getAllUsers);
router.get('/active', passport.authenticate('jwt', { session: false }),usersController.activeUsers);
router.get('/:user_id/',passport.authenticate('jwt', { session: false }), usersController.getUserById);
router.put('/:user_id/delete',passport.authenticate('jwt', { session: false }), usersController.userDelete);
router.delete('/:user_id/delete',[passport.authenticate('jwt', { session: false }),checkAdmin], usersController.userDeletePermanent);
router.get('/:user_id/posts', passport.authenticate('jwt', { session: false }), usersController.userAllPosts)


module.exports = router;