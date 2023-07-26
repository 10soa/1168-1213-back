const mongoose = require( 'mongoose')
const Schema = mongoose.Schema;
var AutoIncrement = require('mongoose-sequence')(mongoose);

// Create Schema Instance and add schema propertise
const testSchema = new Schema({
    test: {type:String}
});

let Test = mongoose.model("Test", testSchema,"Test");
module.exports = {Test}