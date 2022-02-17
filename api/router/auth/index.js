const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../modules/db');

const router = express.Router();

const secret = process.env.AUTH_SECRET;

router.post('/create-token/', async (request, response) => {
  const { username, password } = request.body;
  if (!(username && password)) {
    return response.status(401).json({ message: 'Erreur: Remplir les champs' });
  }
  // console.log(`create token avec: ${JSON.stringify(request.body, null, 4)}`);
  const user = await db('users').where('username', username).first();
  if (!user) {
    return response.status(401).json({ message: 'Vous n\'êtes pas autorisé' });
  }
  // console.log(`trouvé l'utilisateur: ${JSON.stringify(user, null, 4)}`);

  const result = await bcrypt.compare(password, user.password);
  if (!result) {
    return response.status(401).json({ message: 'Vous n\'êtes pas autorisé' });
  }

  // définir les informations à encoder dans le jeton
  const claims = {
    id: user.id,
    username: user.username,
    // Email: user.Email,
  };
  const token = jwt.sign(claims, secret);
  return response.status(200).json({ token });
});

router.post('/register/', async (request, response) => {
  const { username, type, password, nomResto } = request.body;
  console.log(request.body);
  if (!(username && password)) {
    return response.status(401).json({ message: 'Erreur: Remplir les champs' });
  }
  const hashedPassword = await bcrypt.hash(password, 8);
  let userids = [];
  let body = null;
  if (type && nomResto === '') {
    return response.status(401).json({ message: 'Erreur: Il faut avoir un nom de restaurant' });
  }
  const nomRestoExists = await db('restaurants').where('nomResto', nomResto).first();
  if (nomRestoExists) {
    return response.status(403).json({ message: 'Erreur: nomResto taken' });
  }
  const usernameExists = await db('users').where('username', username).first();
  if (usernameExists) {
    return response.status(403).json({ message: 'Erreur: Username taken' });
  }

  try {
    userids = await db('users')
      .insert({
        username,
        type,
        password: hashedPassword,
      }, 'id');
    const userid = userids[0];
    body = { userid, type, username };
    if (type) {
      restoids = await db('restaurants')
          .insert({
            usernameId: userid,
            nomResto: nomResto,
          }, 'id');
      console.log(restoids);
    }
  } catch (e) {
    console.log('Une erreur s\'est produite pendant le insert', e.message);
    return response.status(400).json({ message: e.message });
  }
  return response.status(201).json(body);
});

module.exports = router;
