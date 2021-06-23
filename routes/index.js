const router = require('express').Router();
const userRoutes = require('./users');

router.use('/users', userRoutes);
// router.get('/', (req, res) => {
//     console.log('hello');
// })
module.exports = router;