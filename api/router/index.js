const { Router } = require('express');
const authMiddleware = require('../modules/auth-middleware');
const restaurants = require('./restaurants');
const auth = require('./auth');
const profile = require('./profile');
const images = require('./images');
const reservation = require('./reservations');
const router = Router();

router.use('/auth', auth);
router.use('/restaurants', restaurants);
router.use('/reservations', authMiddleware, reservation);
router.use('/profile', authMiddleware, profile);
router.use('/images', images);

module.exports = router;
