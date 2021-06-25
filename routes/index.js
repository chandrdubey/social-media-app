const router = require('express').Router();
const userRoutes = require('./users');
const adminPostsRoutes = require('./posts');

router.use('/users', userRoutes);
router.use('/posts', adminPostsRoutes);
// router.get('/', (req, res) => {
//     console.log('hello');
// })
module.exports = router;