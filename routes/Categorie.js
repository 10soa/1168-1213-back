const express = require( 'express');
const router = express.Router();

const categorie = require('../Controlleur/CategorieControlleur');

router.get('/categories', categorie.getAllCategories);
router.get('/articles/:categorie', categorie.getAllArticlesCategorie);
router.get('/articles', categorie.findArticles);
router.get('/article/:idCategorie', categorie.getOneArticle);
router.get('/multimedia/photos/:off/:lim', categorie.getAllMediasImages);
router.get('/multimedia/videos/:off/:lim', categorie.getAllMediasVideos);

module.exports = router;