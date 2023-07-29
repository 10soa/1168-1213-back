const express = require( 'express');
const router = express.Router();

const categorie = require('../Controlleur/CategorieControlleur');

router.get('/categories', categorie.getAllCategories);

module.exports = router;