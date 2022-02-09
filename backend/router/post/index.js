const express = require('express');
const db = require('../../modules/db');

const router = express.Router();

router.post('/', async (request, response) => {
  const { TagName, Title, Description } = request.body;
  if (!(TagName && Title && Description)) {
    return response.status(401).json({ message: 'Erreur: Remplir les champs' });
  }
  console.log('L\'identité reliée au bearer token est:', JSON.stringify(request.user, null, 4));
  await db('posts')
    .insert({
      UserId: request.user.UserId,
      TagName,
      Title,
      Description,
      Username: request.user.Username,
    });

  return response.status(200).json({ message: 'Post crée.' });
});

router.delete('/', async (request, response) => {
  console.log('L\'identité reliée au bearer token est:', JSON.stringify(request.user));

  if (!request.query.postId) { return response.status(400).json({ message: 'PostId doit être spécifié.' }); }
  const { postId } = request.query;

  // const user = await db('users').where('email', request.user.email).first();
  const post = await db('posts').where('PostId', postId).first();
  if (!post) { return response.status(400).json({ message: 'Le post n\'existe pas.' }); }
  if (post.UserId !== request.user.UserId) {
    return response.status(401).json({ message: 'Interdit vous n\'êtes pas le publieur du post ni un admin ' });
  }
  await db('posts').delete().where('UserId', request.user.UserId).andWhere('PostId', postId);
  return response.status(200).json({ message: 'Supprimé.' });
});

module.exports = router;
