const router = require('express').Router();

const postsController = require('../controllers/posts');
const commentsController = require('../controllers/comments');


router.post('/new',postsController.newPost);
router.get('/', postsController.getAllPosts);
router.get('/archive',postsController.archivePosts);
router.put('/:post_id/edit', postsController.editPost);
router.delete('/:post_id/delete', postsController.postDeletePermanent);
router.put('/:post_id/toggle-like', postsController.postLikeOrUnlike);
router.get('/:post_id/comments', commentsController.postComments);

module.exports = router;