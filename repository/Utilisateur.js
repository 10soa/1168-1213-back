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
// { 
//   libelle: String,
//   description: String,
//   image: String,
//   localisation: String,
// }

exports.addUserShare = async (id,partage) => {
  try{
    if(!partage.libelle){
      throw new Error(" Libelle obligatoire");
    }
    if(!partage.note){
      throw new Error(" Note obligatoire");
    }
    if(partage.note && partage.note > 5){
      throw new Error(" La valeur de note doit être inférieure ou égale à 5");
    }
    if(!partage.localisation){
      throw new Error(" Localisation obligatoire");
    }
    const data = await Utilisateur.findOneAndUpdate(
      {
        _id: new ObjectID(id)
      },
      {
        $push: {
          "partage": {
            libelle: partage.libelle,
            description: partage.description && partage.description,
            date_publication : Date.now(),
            localisation: partage.localisation,
            image: partage.image,
            note: partage.note
          },
        },
      }
    );
    return data;
  }catch (err){
    throw err;
  }
}

/* fiche publiction */
exports.getOnePublication = async (id) => {
  try {
    const varUnwind =  { $unwind: "$partage" };
    const varMatch = {
      $match: {
        "partage._id": new ObjectID(id)
      },
    };
    const data = await Utilisateur.aggregate([varUnwind, varMatch]);  
  return data;
  } catch (err) {
      throw err; 
  }
};





