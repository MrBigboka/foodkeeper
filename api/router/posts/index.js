const express = require('express');
const db = require('../../modules/db');

const router = express.Router();

// Rating, Comments count
router.get('/', async (request, response) => {
  const {
    postId,
  } = request.query;
  try {
    let posts = db.raw('select posts.*, users.ProfilePic, count(comments.CommentId) as totalComments, totalRating\t\n'
        + 'from posts left JOIN\n'
        + '    (select PostId, sum(RatingValue) as totalRating\n'
        + '    from rating\n'
        + '    group by PostId\n'
        + '    ) rating\n'
        + '    on rating.PostId = posts.PostId left JOIN\n'
        + '    comments\n'
        + '    on comments.PostId = posts.PostId left JOIN\n'
        + '    users\n'
        + '    on users.UserId = posts.UserId\n'
        + 'group by posts.PostId');
    if (postId) {
      const postIdExists = await db('posts').where('PostId', postId).first();
      if (!postIdExists) {
        return response.status(404).json({ message: 'Post non existant' });
      }
      const likes = await db('rating').where('PostId', '=', postId)
        .where('RatingValue', '=', 1).count('RatingValue as likes')
        .first();
      const dislikes = await db('rating').where('PostId', '=', postId)
        .where('RatingValue', '=', -1).count('RatingValue as dislikes')
        .first();
      posts = await db.raw('select posts.*, users.ProfilePic, count(comments.CommentId) as totalComments, totalRating\n'
          + 'from posts left JOIN\n'
          + '    (select PostId, sum(RatingValue) as totalRating\n'
          + '    from rating\n'
          + '    group by PostId\n'
          + '    ) rating\n'
          + '    on rating.PostId = posts.PostId left JOIN\n'
          + '    comments\n'
          + '    on comments.PostId = posts.PostId left JOIN\n'
          + '    users\n'
          + '    on users.UserId = posts.PostId\n'
          + `    where posts.PostId = ${postId}\n`
          + 'group by posts.PostId');
      posts[0][0].likes = likes.likes;
      posts[0][0].dislikes = dislikes.dislikes;
      return response.status(200).json(posts[0][0]);
    }
    posts = await (posts);
    return response.status(200).json(posts[0]);
  } catch (e) {
    return response.status(404).json({ message: 'Erreur de requete' });
  }
});

module.exports = router;
