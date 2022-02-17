const express = require('express');
const db = require('../../modules/db');

const router = express.Router();

router.get('/:postId', async (request, response) => {
  const { postId } = request.params;
  const ratingExists = await db('rating').where('PostId', postId).where('UserId', '=', request.user.UserId).first();
  if (!ratingExists) { return response.status(400).json({ rating: 0 }); }
  return response.status(200).json({ rating: ratingExists.RatingValue });
});

router.post('/:postId/:rating', async (request, response) => {
  const { postId, rating } = request.params;
  let ratingInsert; // Pour l'insertion
  const postExists = await db('posts').where('PostId', postId).first();
  if (!(rating === 'upvote' || rating === 'downvote')) {
    return response.status(404).json({ message: 'Mauvaise option de rating' });
  }
  // eslint-disable-next-line default-case
  switch (rating) {
    case 'upvote':
      ratingInsert = 1;
      break;
    case 'downvote':
      ratingInsert = -1;
      break;
  }
  if (!postExists) { return response.status(400).json({ message: 'Le post n\'existe pas.' }); }
  // console.log('L\'identité reliée au bearer token est:', JSON.stringify(request.user, null, 4));
  // Supprimer le rating s'il existe déjà et insère un nouveau
  await db('rating').delete().where('UserId', '=', request.user.UserId).andWhere('PostId', postId);
  await db('rating')
    .insert({
      PostId: postId,
      UserId: request.user.UserId,
      RatingValue: ratingInsert,
    });
  return response.status(200).json({ message: 'Rating ajouté' });
});

router.delete('/:postId', async (request, response) => {
  const { postId } = request.params;
  const postExists = await db('posts').where('PostId', postId).first();
  if (!postExists) { return response.status(400).json({ message: 'Le post n\'existe pas.' }); }
  await db('rating').delete().where('UserId', '=', request.user.UserId).andWhere('PostId', postId);
  return response.status(200).json({ message: 'Rating vidé' });
});

module.exports = router;
