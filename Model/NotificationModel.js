const mongoose = require( 'mongoose')
const Schema = mongoose.Schema;
var AutoIncrement = require('mongoose-sequence')(mongoose);

// Create Schema Instance and add schema propertise
const testSchema = new Schema({
    libelle: {type:String},
    article_id : {type:Number},
    description : {type : String}
});

let Notification = mongoose.model("Notification", testSchema,"Notification");
module.exports = {Notification}