const express = require('express');
const db = require('../../modules/db');

const router = express.Router();

router.get('/', async (request, response) => {
  const restaurants = await db('restaurants');
  return response.status(200).json(restaurants);
});

router.get('/:restaurantId', async (request, response) => {
  const { restaurantId } = request.params;
  const restaurants = await db('restaurants').where('id', restaurantId).first();
  return response.status(200).json(restaurants);
});

module.exports = router;
