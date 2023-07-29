const express = require( 'express');
const router = express.Router();

const utilisateur = require('../Controlleur/UtilisateurControlleur');

router.get('/allUtilisateur', utilisateur.getAllUtilisateurs);
router.post('/login', utilisateur.login);
router.post('/inscription', utilisateur.createUtilisateur);

module.exports = router;