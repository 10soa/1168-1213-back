const express = require( 'express');
const router = express.Router();

const test = require('../Controlleur/TestControlleur');

router.get('/', test.getTest);

module.exports = router;