const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../../modules/db');

const router = express.Router();

router.get('/', async (request, response) => {
  console.log('L\'identité reliée au bearer token est:', JSON.stringify(request.user, null, 4));
  // console.log(request.user.UserId);
  const { id } = request.user;
  const user = await db('users').where('id', id).first();
  delete user.password;
  console.log(user);
  // si restaurateur -> xxxx
  if (user.type) {
    const restaurant = await db('restaurants').where('usernameId', user.id).first();
    console.log(restaurant);
    let body = {};
    body.user = user;
    body.restaurant = restaurant;
    return response.status(200).json(body);
  }
  return response.status(200).json(user);
});

router.post('/', async (request, response) => {
  function throwError() {
    return response.status(404).json('Erreur, mettre les bons details');
  }
  console.log('L\'identité reliée au bearer token est:', JSON.stringify(request.user, null, 4));
  const user = request.user;
  console.log(user);
  const updates = [];
  const {
    description, capacites, nbTables, nomResto,
  } = request.body;
  if (description) {
    await db('restaurants').where('usernameId', user.id).update('description', description);
    updates.push('description');
  }
  if (capacites) {
    if (parseInt(capacites) > 0) {
      await db('restaurants').where('usernameId', user.id).update('capacites', capacites);
      updates.push('capacites');
    }
  }
  if (nbTables) {
    if (parseInt(nbTables) > 0) {
      await db('restaurants').where('usernameId', user.id).update('nbTables', nbTables);
      updates.push('nbTables');
    }
  }
  if (nomResto) {
    const nomRestoExists = await db('restaurants').where('nomResto', nomResto).first();
    if (nomRestoExists) {
      return response.status(403).json({ message: 'Erreur: nomResto deja pris' });
    }
    await db('restaurants').where('usernameId', user.id).update('nomResto', nomResto);
    updates.push('nomResto');
  }
  // if (ProfilePic) {
  //   await db('users').where('UserId', request.user.UserId).update('ProfilePic ', ProfilePic);
  //   updates.push('Profile Picture');
  // }
  // if (Email) {
  //   const emailExists = await db('users').where('Email', Email).first();
  //   if (emailExists) {
  //     delete emailExists.Password;
  //     return response.status(403).json({ message: 'Erreur: Email taken' });
  //   }
  //   await db('users').where('UserId', request.user.UserId).update('Email', Email);
  //   updates.push('Email');
  // }
  // if (Password && ConfirmPassword && Password === ConfirmPassword) {
  //   const hashedPassword = await bcrypt.hash(Password, 8);
  //   await db('users').where('UserId', request.user.UserId).update('Password', hashedPassword);
  //   updates.push('Password');
  // }
  // if (updates.length === 0) {
  //   return response.status(200).json('Aucun changement');
  // }
  return response.status(200).json(`Les changements: ${updates.join(' / ')}`);
});

// router.delete('/', async (request, response) => {
//   await db('comments').where('UserId', request.user.UserId).update('Comment', '[deleted]');
//   await db('restaurants').where('UserId', request.user.UserId).update({
//     TagName: '[deleted]',
//     Title: '[deleted]',
//     Description: '[deleted]',
//     Image: null,
//     username: '[deleted]',
//   });
//   await db('users').update({
//     Username: '[deleted]',
//     ProfilePic: null,
//     Email: '[deleted]',
//     Password: 1, // On ne peut plus accéder au compte de cette facon
//   }).where('UserId', request.user.UserId);
//   await db('rating').delete().where('UserId', request.user.UserId);
//   console.log('L\'identité reliée au bearer token est:', JSON.stringify(request.user));
//   return response.status(200).json('Supprimé');
// });

module.exports = router;
