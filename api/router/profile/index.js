const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../../modules/db');
const {promises: fs} = require("fs");
const multer = require('multer');
const path = require("path");
const router = express.Router();

router.post('/upload', async (request, response) => {
  const upload = multer({dest:'./public/uploads/'}).single('image');
  upload(request, response, async (err) => {
    if (err) {
      response.status(400).send("Something went wrong!");
    }
    response.send(request.file);
    fs.rename(`./public/uploads/${request.file.filename}`, `./public/uploads/${request.file.filename}.png`, function(err) {
      if ( err ) console.log('ERROR: ' + err);
    });
    await db('restaurants').where('usernameId', request.user.id).update('photo', `${request.file.filename}.png`);
    // return response.status(200).json('lol');
  });
});

router.get('/upload', async (request, response) => {
  const path = require('path');
  console.log(path.resolve('public/index.html'));
  // console.log(__dirname, '../public', 'index1.html');
  const photo = await db('restaurants').select('photo').where('usernameId', request.user.id).first();
  return response.sendFile(path.resolve(`public/uploads/${photo.photo}`));
});
router.get('/', async (request, response) => {
  console.log('L\'identité reliée au bearer token est:', JSON.stringify(request.user, null, 4));
  // console.log(request.user.UserId);
  const { id } = request.user;
  const user = await db('users').where('id', id).first();
  delete user.password;
  // si restaurateur -> xxxx
  if (user.type) {
    const restaurant = await db('restaurants').where('usernameId', user.id).first();
    console.log(restaurant);
    let body = {};
    body.user = user;
    body.restaurant = restaurant;
    return response.status(200).json(body);
  } else {
    return response.status(404).json('client');
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
    description, capacites, nbTables, nomResto, ouverture, fermeture
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
  if (ouverture && fermeture) {
    if (true) {

      await db('restaurants').where('usernameId', user.id).update('ouverture', ouverture);
      await db('restaurants').where('usernameId', user.id).update('fermeture', fermeture);
      updates.push('ouverture et fermeture');
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
