const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);

module.exports = router;
