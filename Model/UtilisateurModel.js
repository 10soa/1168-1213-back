const mongoose = require( 'mongoose')
const Schema = mongoose.Schema;
var AutoIncrement = require('mongoose-sequence')(mongoose);
var ObjectID = require("mongoose").Types.ObjectId;

const testSchema = new Schema({
    nom : {type: String},
    prenom : {type: String},
    email : { type: String},
    pseudo : {type : String},
    naissance : {type : Date},
    pays : {type:String},
    mdp : {type:String},
    partage : [{
        description : {type:String},
        libelle : {type:String},
        image : {type:String},
        note : {type:Number},
        localisation : {type:String},
        date_publication:{type: Date},
    }],
    favoris : [{
        article_id : {type:ObjectID},
        libelle : {type:String},
        description : {type:String},
        localisation : {type:String},
    }],
    sexe : {type:Number}
});

let Utilisateur = mongoose.model("Utilisateur", testSchema,"Utilisateur");
module.exports = {Utilisateur}