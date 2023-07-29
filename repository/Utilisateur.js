var { Utilisateur } = require("../Model/UtilisateurModel");
var ObjectID = require("mongoose").Types.ObjectId;
const { Console } = require("console");
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
      res.status(200).json({ data });
    }else{
      res.status(400).json({
        status: 400,
        message: "Email ou mot de passe invalide",
      });
    }
  }catch (err){
    res.status(400).json({
      status: 400,
      message: err.message,
    });
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
    const mdpCrypter = { ...req.body, mdp: configuration };

    let data = await Utilisateur.create(mdpCrypter);
    return res.status(201).json({ message: 'Utilisateur créé avec succès.', data });
  } catch (err) {
    return res.status(500).json({ error: 'Une erreur s\'est produite lors de la création de l\'utilisateur.' });
  }
};



