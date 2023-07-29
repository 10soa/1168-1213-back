var { Utilisateur } = require("../Model/UtilisateurModel");
var ObjectID = require("mongoose").Types.ObjectId;
const { Console } = require("console");
const { BSONSymbol } = require("mongodb");

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
