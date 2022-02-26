const express = require('express');
const db = require('../../modules/db');

const router = express.Router();

router.get('/', async (request, response) => {
  const reservation = await db('reservation');
  return response.status(200).json(reservation);
});

router.get('/:reservationId', async (request, response) => {
  const { reservationId } = request.params;
  const reservation = await db('reservation').where('id', reservationId).first();
  return response.status(200).json(reservation);
});

router.post('/:reservationId', async (request, response) => {
    const {
      clientId,
      restaurantId, 
      nom, 
      prenom, 
      telephone,
      nbPersonne,
      note,
      date,
       } = request.body;
  
    const reservation = await db('reservation')
      .insert({ 
        clientId,
        restaurantId,
        nom,
        prenom,
        telephone,
        nbPersonne,
        note,
        date
      },['id']);
  
  return response.status(201).json({ reservationId: reservation[0] });
});

router.put('/:reservationId', async (request, response) => {
  const { reservationId } = request.params;
  const {
    nom,
    prenom,
    telephone,
    nbPersonne,
    note,
    date,
  } = request.body;

  const reservationExist = await db('reservation')
    .where('id', reservationExist)
    .first();
  if (!reservationExist) {
    return response.status(400).json({ message: 'Cette réservation est introuvable' });
  }

  await db('reservation')
    .update({
      nom,
      prenom,
      telephone,
      nbPersonne,
      note,
      date, })
    .where('id', reservationId);

  return response.status(200).json({ modified: true });
});

router.delete('/:reservationId', async (request, response) => {
  const { reservationId } = request.params;

  const reservationExist = await db('reservation')
    .where('reservationId', reservationId)
    .first();
  if (!reservationExist) {
    return response.status(400).json({ message: 'Cette réservation est introuvable' });
  }

  await db('reservation')
    .where('id', reservationId)
    .del();

  return response.status(200).json({ deleted: true });
});

module.exports = router;