const express = require('express');
const db = require('../../modules/db');

const router = express.Router();

router.get('/:userId', async (request, response) => {
  const { userId } = request.params;
  const user = await db('users').select('Username', 'ProfilePic').where('UserId', userId).first();
  if (!user) { return response.status(404).json({ message: 'Utilisateur non existant' }); }
  user.posts = await db('posts').where('UserId', userId);
  user.comments = await db('comments').where('UserId', userId);
  return response.status(200).json(user);
});

router.get('/name/:userName', async (request, response) => {
  const { userName } = request.params;
  const user = await db('users').select('Username', 'ProfilePic', 'UserId').where('Username', userName).first();
  console.log(user);
  if (!user) { return response.status(404).json({ message: 'Utilisateur non existant' }); }
  user.posts = await db('posts').where('UserId', user.UserId);
  user.comments = await db('comments').where('UserId', user.UserId);
  return response.status(200).json(user);
});

module.exports = router;
