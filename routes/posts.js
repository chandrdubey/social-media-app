const router = require('express').Router();
const postsController = require('../controllers/posts');
const commentsController = require('../controllers/comments');
const passport = require('passport');

router.post('/new',passport.authenticate('jwt', { session: false }), postsController.newPost);
router.get('/', postsController.getAllPosts);
router.get('/archive', passport.authenticate('jwt', { session: false }),postsController.archivePosts);
router.put('/:post_id/edit',passport.authenticate('jwt', { session: false }), postsController.editPost);
router.delete('/:post_id/delete',passport.authenticate('jwt', { session: false }), postsController.postDeletePermanent);
router.put('/:post_id/toggle-like',passport.authenticate('jwt', { session: false }), postsController.postLikeOrUnlike);
router.get('/:post_id/comments',passport.authenticate('jwt', { session: false }), commentsController.postAllComments);

module.exports = router;