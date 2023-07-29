const mongoose = require( 'mongoose')
const Schema = mongoose.Schema;
var AutoIncrement = require('mongoose-sequence')(mongoose);

// Create Schema Instance and add schema propertise
const testSchema = new Schema({
    nom : {type: String},
    prenom : {type: String},
    email : { type: String},
    pseudo : {type : String},
    naissance : {type : Date},
    pays : {type:String},
    mdp : {type:String},
    partage : [],
    favoris : [],
});
let Utilisateur = mongoose.model("Utilisateur", testSchema,"Utilisateur");
module.exports = {Utilisateur}