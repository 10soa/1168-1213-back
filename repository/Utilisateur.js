var { Utilisateur } = require("../Model/UtilisateurModel");
var ObjectID = require("mongoose").Types.ObjectId;
const { BSONSymbol } = require("mongodb");
const bcrypt = require('bcrypt');
const flatted = require('flatted');

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
    let data = await Utilisateur.find({ email: username});
    console.log(typeof data);
     if(data){
      for (const utilisateur of data){
        const match = await bcrypt.compare(mdp,utilisateur.mdp);
        if(match){
          return utilisateur
        }
      }
    }else{
      throw new Error("Email ou mot de passe incorrect");
    }
    throw new Error("Email ou mot de passe incorrect");
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
    const hashedPassword = await bcrypt.hash(mdp, salt);
    const bodyWithHashedPassword = { ...req.body, mdp: hashedPassword };
    let data = await Utilisateur.create(bodyWithHashedPassword);
    return data;
  } catch (err) {
    return res.status(500).json({ error: 'Une erreur s\'est produite lors de la création de l\'utilisateur.' });
  }
};






