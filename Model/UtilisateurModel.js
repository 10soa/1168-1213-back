const mongoose = require( 'mongoose')
const Schema = mongoose.Schema;
var AutoIncrement = require('mongoose-sequence')(mongoose);

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
        localisation : {type:String}
    }],
    favoris : [{
        article_id : {type:Number},
        libelle : {type:String},
        description : {type:String},
        localisation : {type:String},
        datepublication : {type:Date}
    }],
});

let Utilisateur = mongoose.model("Utilisateur", testSchema,"Utilisateur");
module.exports = {Utilisateur}