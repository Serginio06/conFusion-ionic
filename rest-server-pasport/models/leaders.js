var mongoose = require('mongoose');
var Schema = mongoose.Schema; // see http://mongoosejs.com/docs/guide.html

//Add mongoose-currency type
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var leadersSchema = new Schema({
    name: {
        type: String,
        required: true,
//        unique: true
    },
    image: {
        type: String,
        required: true
        
    },
    designation: {
        type: String,
        required: true
    },
    abbr: {
        type: String,
        required: true
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
var leadersModel = mongoose.model ('Leader', leadersSchema);
module.exports = leadersModel;