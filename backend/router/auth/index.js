const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../modules/db');

const router = express.Router();

const secret = process.env.AUTH_SECRET;

router.post('/create-token/', async (request, response) => {
  const { Email, Password } = request.body;
  if (!(Email && Password)) {
    return response.status(401).json({ message: 'Erreur: Remplir les champs' });
  }
  // console.log(`create token avec: ${JSON.stringify(request.body, null, 4)}`);
  const user = await db('users').where('Email', Email).first();
  if (!user) {
    return response.status(401).json({ message: 'Vous n\'êtes pas autorisé' });
  }
  // console.log(`trouvé l'utilisateur: ${JSON.stringify(user, null, 4)}`);

  const result = await bcrypt.compare(Password, user.Password);
  if (!result) {
    return response.status(401).json({ message: 'Vous n\'êtes pas autorisé' });
  }

  // définir les informations à encoder dans le jeton
  const claims = {
    UserId: user.UserId,
    Username: user.Username,
    Email: user.Email,
  };
  const token = jwt.sign(claims, secret);
  return response.status(200).json({ token });
});

router.post('/register/', async (request, response) => {
  const { Username, Email, Password } = request.body;
  // console.log(request.body);
  // ProfilePic à venir
  if (!(Username && Email && Password)) {
    return response.status(401).json({ message: 'Erreur: Remplir les champs' });
  }
  const hashedPassword = await bcrypt.hash(Password, 8);
  let userids = [];
  let body = null;

  const usernameExists = await db('users').where('Username', Username).first();
  if (usernameExists) {
    delete usernameExists.Password;
    // console.log(usernameExists);
    return response.status(403).json({ message: 'Erreur: Username taken' });
  }
  const emailExists = await db('users').where('Email', Email).first();
  if (emailExists) {
    delete emailExists.Password;
    // console.log(emailExists);
    return response.status(403).json({ message: 'Erreur: Email taken' });
  }
  try {
    userids = await db('users')
      .insert({
        Username,
        Email,
        Password: hashedPassword,
      }, 'UserId');
    const userid = userids[0];
    body = { userid, Email, Username };
  } catch (e) {
    console.log('Une erreur s\'est produite pendant le insert', e.message);
    return response.status(400).json({ message: e.message });
  }
  return response.status(201).json(body);
});

module.exports = router;
