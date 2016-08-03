var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Add mongoose-currency type
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var promotionsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required:true
    },
    label: {
        type: String,
        default: ""
    },
    price: {
        type: Currency,
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
var promotionsModel = mongoose.model ('Promotion', promotionsSchema);
module.exports = promotionsModel;