const mongoose = require( 'mongoose')
const Schema = mongoose.Schema;

// Create Schema Instance and add schema propertise
const categorieSchema = new Schema({
    categorie: {type:String},
    article: [],
});

let Categorie = mongoose.model("Categorie", categorieSchema,"Categorie");
module.exports = {Categorie}