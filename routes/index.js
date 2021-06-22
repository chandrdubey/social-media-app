const router = require('express').Router();
const userRoutes = require('./users');

router.post('/user/new', userRoutes);

module.exports = router;