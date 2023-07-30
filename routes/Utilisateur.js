const express = require( 'express');
const router = express.Router();

const utilisateur = require('../Controlleur/UtilisateurControlleur');

router.get('/allUtilisateur', utilisateur.getAllUtilisateurs);
router.post('/login', utilisateur.login);
router.post('/inscription', utilisateur.createUtilisateur);
router.post('/utilisateurs/:id', utilisateur.addUserShare);
router.get('/partage/:idparatage', utilisateur.getOnePublication);
router.get('/fiche/:idutilisateur', utilisateur.getFicheUtilisateur);
router.get('/recherchePartage/:off/:lim', utilisateur.getAllUserExperiencePagination);
router.get('/partage/liste/:iduser/:off/:lim', utilisateur.getAllListPartage_utilisateurPagination);
router.delete('/partage/delete/:idutilisateur/:idpartage', utilisateur.deletePartageUtilisateur);
router.get('/favoris/:id', utilisateur.listeFavoris);
router.post('/favoris/:id/:article', utilisateur.addFavoris);

module.exports = router;