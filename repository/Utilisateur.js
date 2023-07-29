var { Utilisateur } = require("../Model/UtilisateurModel");
var ObjectID = require("mongoose").Types.ObjectId;
const { BSONSymbol } = require("mongodb");
const bcrypt = require('bcrypt');

exports.getAllUtilisateurs = async (res) => {
  try {
    let data = await Utilisateur.find();
    return data;
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

exports.login = async (username, mdp, res) => {
  try{
    let data = await Utilisateur.findOne({ email: username, mdp: mdp });
    if(data){
      return data;
    }else{
      throw new Error("Email ou mot de passe incorrect");
    }
  }catch (err){
    throw err;
  }
}


exports.createUtilisateur = async (req, res) => {
  try {
    const { mdp } = req.body;
    if (!mdp) {
      return res.status(400).json({ error: 'Le champ "Mot de passe" est requis.' });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const configuration = await bcrypt.hash(mdp, salt);

    const mdpCrypter = {
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      pseudo: req.body.pseudo,
      naissance: req.body.naissance,
      pays: req.body.pays,
      mdp: configuration,
    };

    let data = await Utilisateur.create(mdpCrypter);
    return res.status(201).json({ message: 'Utilisateur créé avec succès.', data });
  } catch (err) {
    return res.status(500).json({ error: 'Une erreur s\'est produite lors de la création de l\'utilisateur.' });
  }
};




