const { Router } = require('express');
const authMiddleware = require('../modules/auth-middleware');
const posts = require('./posts');
const users = require('./users');
const comments = require('./comments');
const auth = require('./auth');
const post = require('./post');
const profile = require('./profile');
const comment = require('./comment');
const ratings = require('./ratings');
const rate = require('./rate');

const router = Router();

router.use('/posts', posts);
router.use('/users', users);
router.use('/comments', comments);
router.use('/ratings', ratings);
router.use('/auth', auth);
router.use('/post', authMiddleware, post);
router.use('/profile', authMiddleware, profile);
router.use('/comment', authMiddleware, comment);
router.use('/rate', authMiddleware, rate);
module.exports = router;
