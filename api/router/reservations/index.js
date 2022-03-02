const express = require('express');
const db = require('../../modules/db');

const router = express.Router();

router.get('/client/', async (request, response) => {
  const { clientId } = request.params;
  const reservation = await db('reservation')
    .where('clientId', clientId);
  return response.status(200).json(reservation);
});

router.get('/restaurant/:restaurantId', async (request, response) => {
  const { restaurantId } = request.params;
  const reservation = await db('reservation')
    .where('restaurantId', restaurantId);
  return response.status(200).json(reservation);
});

router.get('/:reservationId', async (request, response) => {
  const { reservationId } = request.params;
  const reservation = await db('reservations').where('id', reservationId).first();
  return response.status(200).json(reservation);
});

router.post('/', async (request, response) => {
  try {
    const {
      restaurantId,
      nom,
      prenom,
      telephone,
      nbPersonnes,
      note,
      date,
    } = request.body;
    const parseNbPer = parseInt(nbPersonnes) || 0;
    if (!date) {
      return response.status(404).json({ error: 'Il faut une date'});
    }
    if (parseNbPer <= 0) {
      return response.status(404).json({ error: 'nb personnes pas bon'});
    }
    const reservation = await db('reservations')
      .insert({
        restaurantId,
        clientId: request.user.id,
        nom,
        prenom,
        telephone,
        nbPersonnes,
        note,
        date
      },['id']);

    return response.status(201).json({ reservationId: reservation[0] });
  } catch (e) {
    return response.status(401).json(e);
  }

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