const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../../modules/db');

const router = express.Router();

router.get('/', async (request, response) => {
  console.log('L\'identité reliée au bearer token est:', JSON.stringify(request.user, null, 4));
  // console.log(request.user.UserId);
  const { UserId } = request.user;
  const user = await db('users').select('Username', 'ProfilePic').where('UserId', UserId).first();
  if (!user) { return response.status(404).json({ message: 'Utilisateur non existant' }); }
  user.posts = await db('posts').where('UserId', UserId);
  user.comments = await db('comments').where('UserId', UserId);
  return response.status(200).json(user);
});

router.post('/', async (request, response) => {
  console.log('L\'identité reliée au bearer token est:', JSON.stringify(request.user, null, 4));
  const updates = [];
  const {
    Username, ProfilePic, Email, Password, ConfirmPassword,
  } = request.body;
  if (Username) {
    const usernameExists = await db('users').where('Username', Username).first();
    if (usernameExists) {
      delete usernameExists.Password;
      return response.status(403).json({ message: 'Erreur: Username taken' });
    }
    await db('users').where('UserId', request.user.UserId).update('Username', Username);
    updates.push('Username');
  }
  if (ProfilePic) {
    await db('users').where('UserId', request.user.UserId).update('ProfilePic ', ProfilePic);
    updates.push('Profile Picture');
  }
  if (Email) {
    const emailExists = await db('users').where('Email', Email).first();
    if (emailExists) {
      delete emailExists.Password;
      return response.status(403).json({ message: 'Erreur: Email taken' });
    }
    await db('users').where('UserId', request.user.UserId).update('Email', Email);
    updates.push('Email');
  }
  if (Password && ConfirmPassword && Password === ConfirmPassword) {
    const hashedPassword = await bcrypt.hash(Password, 8);
    await db('users').where('UserId', request.user.UserId).update('Password', hashedPassword);
    updates.push('Password');
  }
  if (updates.length === 0) {
    return response.status(200).json('Aucun changement');
  }
  return response.status(200).json(`Les changements: ${updates.join(' / ')}`);
});

router.delete('/', async (request, response) => {
  await db('comments').where('UserId', request.user.UserId).update('Comment', '[deleted]');
  await db('posts').where('UserId', request.user.UserId).update({
    TagName: '[deleted]',
    Title: '[deleted]',
    Description: '[deleted]',
    Image: null,
    username: '[deleted]',
  });
  await db('users').update({
    Username: '[deleted]',
    ProfilePic: null,
    Email: '[deleted]',
    Password: 1, // On ne peut plus accéder au compte de cette facon
  }).where('UserId', request.user.UserId);
  await db('rating').delete().where('UserId', request.user.UserId);
  console.log('L\'identité reliée au bearer token est:', JSON.stringify(request.user));
  return response.status(200).json('Supprimé');
});

module.exports = router;
