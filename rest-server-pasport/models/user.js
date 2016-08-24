var mongoose = require('mongoose');
var Schema = mongoose.Schema; // see http://mongoosejs.com/docs/guide.html
var passportLocalMongoose = require('passport-local-mongoose');


var User = new Schema({
  
        username: String,
        password: String,
        admin: {
            type: Boolean,
            default: false
        }
    });

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
