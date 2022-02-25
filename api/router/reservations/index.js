const express = require('express');
const db = require('../../modules/db');

const router = express.Router();

router.get('/', async (request, response) => {
  const restaurants = await db('restaurants');
  return response.status(200).json(restaurants);
});

router.get('/:reservationId', async (request, response) => {
  const { restaurantId } = request.params;
  const restaurants = await db('restaurants').where('id', restaurantId).first();
  return response.status(200).json(restaurants);
});

router.post('/:reservationId', async (request, response) => {
    const { firstName, lastName, email } = request.body;
  
    const oneStudent = await db('students')
      .where('email', email).first();
    if (oneStudent) {
      return response.status(400).json({ message: 'Un étudiant possède le même courriel' });
    }
  
    const studentId = await db('students')
      .insert({ first_name: firstName, last_name: lastName, email }, ['id']);
  
    return response.status(201).json({ studentId: studentId[0] });
  });

module.exports = router;
