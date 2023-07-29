const express = require( 'express');
const router = express.Router();

const categorie = require('../Controlleur/CategorieControlleur');

router.get('/categories', categorie.getAllCategories);
router.get('/articles/:categorie', categorie.getAllArticlesCategorie);
router.get('/articles', categorie.findArticles);

module.exports = router;