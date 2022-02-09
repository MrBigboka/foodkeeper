const express = require('express');
const db = require('../../modules/db');

const router = express.Router();

router.get('/:postId', async (request, response) => {
  const { postId } = request.params;
  const { likes } = await db('rating').where('PostId', '=', postId)
    .where('RatingValue', '=', 1).count('RatingValue as likes')
    .first();
  const { dislikes } = await db('rating').where('PostId', '=', postId)
    .where('RatingValue', '=', -1).count('RatingValue as dislikes')
    .first();

  const rating = likes - dislikes;
  return response.status(200).json({ rating, likes, dislikes });
});

module.exports = router;
