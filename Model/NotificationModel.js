const mongoose = require( 'mongoose')
const Schema = mongoose.Schema;
var AutoIncrement = require('mongoose-sequence')(mongoose);
var ObjectID = require("mongoose").Types.ObjectId;

// Create Schema Instance and add schema propertise
const testSchema = new Schema({
    libelle: {type:String},
    article_id : {type:ObjectID},
    description : {type : String},
    date : {type : Date},
});

let Notification = mongoose.model("Notification", testSchema,"Notification");
module.exports = {Notification}