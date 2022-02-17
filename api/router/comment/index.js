const express = require('express');
const db = require('../../modules/db');

const router = express.Router();

router.post('/:postId', async (request, response) => {
  let { Description } = request.body;
  const { postId } = request.params;
  Description = Description.trim();
  if (Description.length === 0) {
    return response.status(401).json({ message: 'Erreur: Remplir les champs' });
  }
  const postExists = await db('posts').where('PostId', postId).first();
  if (!postExists) { return response.status(400).json({ message: 'Le post n\'existe pas.' }); }
  // console.log('L\'identité reliée au bearer token est:', JSON.stringify(request.user, null, 4));
  await db('comments')
    .insert({
      PostId: postId,
      UserId: request.user.UserId,
      Comment: Description,
    });
  return response.status(200).json({ message: 'Commentaire crée.' });
});

router.delete('/:commentId', async (request, response) => {
  const { commentId } = request.params;
  console.log(commentId);
  if (!commentId) {
    return response.status(401).json({ message: 'Erreur: Remplir les champs' });
  }
  // const user = await db('users').where('email', request.user.email).first();
  const comment = await db('comments').where('CommentId', commentId).first();
  if (!comment) { return response.status(400).json({ message: 'Le commentaire n\'existe pas.' }); }
  if (comment.UserId !== request.user.UserId) {
    return response.status(401).json({ message: 'Interdit vous n\'êtes pas le publieur du commentaire ni un admin ' });
  }
  await db('comments').delete().where('UserId', request.user.UserId).andWhere('CommentId', commentId);
  return response.status(200).json({ message: 'Supprimé.' });
});

module.exports = router;
