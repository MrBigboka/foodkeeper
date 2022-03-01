const { Router } = require('express');
const authMiddleware = require('../modules/auth-middleware');
const restaurants = require('./restaurants');
const auth = require('./auth');
const profile = require('./profile');

router.use('/auth', auth);
router.use('/restaurants', restaurants);
router.use('/reservation', authMiddleware, reservation);
router.use('/profile', authMiddleware, profile);
router.use('/images', images);

module.exports = router;
