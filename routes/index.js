const router = require('express').Router();
const userRoutes = require('./users');
const postRoutes = require('./posts');
const commentRoutes = require('./comments');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/posts/:post_id/comments', commentRoutes);

// router.get('/', (req, res) => {
//     console.log('hello');
// })
module.exports = router;