const router = require('express').Router();
const passport = require('passport');
const commentsController = require('../controllers/comments');

router.post('/new',passport.authenticate('jwt', { session: false }), commentsController.newComment);
router.put('/:comment_id/edit',passport.authenticate('jwt', { session: false }), commentsController.editComment);
router.delete('/:comment_id/delete',passport.authenticate('jwt', { session: false }), commentsController.deleteComment);


module.exports = router;