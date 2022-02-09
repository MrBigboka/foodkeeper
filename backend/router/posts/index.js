const express = require('express');
const db = require('../../modules/db');

const router = express.Router();

// Rating, Comments count
router.get('/', async (request, response) => {
  const {
    postId, tagName, userId, userName,
  } = request.query;
  try {
    let posts = db('posts').select('posts.*', 'users.ProfilePic')
      .leftJoin('comments', 'comments.PostId', '=', 'posts.PostId')
      .leftJoin('users', 'users.UserId', '=', 'posts.UserId')
      // .leftJoin('comments', 'comments.PostId', '=', 'posts.PostId')
      .groupBy('comments.PostId')
      .count('comments.PostId as commentsCount');
    if (postId) {
      const likes = await db('rating').where('PostId', '=', postId)
        .where('RatingValue', '=', 1).count('RatingValue as likes')
        .first();
      const dislikes = await db('rating').where('PostId', '=', postId)
        .where('RatingValue', '=', -1).count('RatingValue as dislikes')
        .first();
      // console.log(likes);
      // const rating = likes.likes - dislikes.dislikes;
      posts = await posts.where('posts.PostId', '=', postId).select(likes, dislikes);
      // posts.likes = likes;
      // console.log(likes, dislikes, rating);
      // posts.rating = rating;
      // console.log(posts.rating);
      // console.log(posts);
      // let comments = db('comments');
      // comments = await comments.where('PostId', '=', postId);
      return response.status(200).json(posts);
    }
    if (tagName) {
      posts = posts.where('TagName', 'like', `%${tagName || ''}%`);
    }
    if (userId) {
      posts = posts.where('posts.UserId', '=', userId);
    }
    if (userName) {
      posts = posts.where('UserName', 'like', userName);
    }
    // orderBy, mostLikes, à venir
    posts = await (posts);
    return response.status(200).json(posts);
  } catch (e) {
    return response.status(404).json({ message: e });
  }
});

module.exports = router;
