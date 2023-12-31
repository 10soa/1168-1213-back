const mongoose = require( 'mongoose')
const Schema = mongoose.Schema;
var AutoIncrement = require('mongoose-sequence')(mongoose);

// Create Schema Instance and add schema propertise
const categorieSchema = new Schema({
    categorie: {type:String},
    lien:{type:String},
    article: [{
        libelle : {type:String},
        court_description : {type:String},
        description : {type:String},
        localisation : {type:String},
        site : {type:String},
        autres : {type:String},
        videos : [{
            lien : {type:String}
        }],
        images: [{
            lien : {type:String}
        }],
        mot_cle : {type:String},
        x: {type:Number},
        y:{type:Number},
        liste_utilisateur_favoris:[]
    }],
});

let Categorie = mongoose.model("Categorie", categorieSchema,"Categorie");
module.exports = {Categorie}