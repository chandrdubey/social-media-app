const router = require('express').Router();

const commentsController = require('../controllers/comments');


router.get('/', commentsController.allComments);
router.get('/new', commentsController.newComment);

module.exports = router;