const router = require('express').Router();

const commentsController = require('../controllers/comments');

router.post('/new', commentsController.newComment);
router.put('/:comment_id/edit', commentsController.editComment);
router.delete('/:comment_id/delete', commentsController.deleteComment);


module.exports = router;