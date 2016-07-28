var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var commentsSchema = mongoose.Schema;

//Create comments schema
var commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
   comment: {
       type: String,
       required: true
   },
    author: {
        type: String,
        required: true
    }
    
},{
    timestamps: true
});

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
    },
    comments: [commentSchema]
}, {
    timestamps: true
});

//Schema without model does not work, we are creating model for the schema
// By default mongoose create collection as plueral form of first parameter of model - 'Dish' in out case
var dishModel = mongoose.model ('Dish', dishSchema);
module.exports = dishModel;
