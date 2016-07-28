var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create Schema
var dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

//Schema without model does not work, we are creating model for the schema
// By default mongoose create collection as plueral form of first parameter of model - 'Dish' in out case
var dishModel = mongoose.model ('Dish', dishSchema);
module.exports = dishModel;
