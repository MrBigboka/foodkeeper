const db = require("../../modules/db");
const path = require("path");
const express = require("express");
const router = express.Router();

router.get('/:link', async (request, response) => {
  const path = require('path');
  // console.log(path.resolve('public/index.html'));
  return response.sendFile(path.resolve(`public/uploads/${request.params.link}`));
});

module.exports = router;