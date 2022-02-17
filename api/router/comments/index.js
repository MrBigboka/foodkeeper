const express = require('express');
const db = require('../../modules/db');

const router = express.Router();

router.get('/:postId', async (request, response) => {
  const { postId } = request.params;
  const comments = await db('comments').select('comments.*', 'users.ProfilePic', 'users.Username')
    .leftJoin('users', 'users.UserId', '=', 'comments.UserId')
    .where('PostId', '=', postId);

  return response.status(200).json(comments);
});

module.exports = router;
