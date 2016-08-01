    var mongoose = require('mongoose')
        , assert = require('assert');
    var promotionsModel = require('./models/promotions');
    var url = 'mongodb://localhost:27017/conFusion';
    mongoose.connect(url);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        //we're connected:
        console.log("Connected correctly to server");
        promotionsModel.create({
            name: 'Weedend Grand Buffet'
            , image: 'images/buffet.png'
            , label: 'New'
            , price: '$19.99'
            , description: 'Featureing...'
        }, function (err, promotion) {
            if (err) throw err;
            console.log(' ================== promotion created! ==================');
                        console.log(promotion);
            //         console.log('=======================================');
            var id = promotion._id;
            promotionsModel.find({
                name: 'Weedend Grand Buffet'
            }, function (err, promotions) {
                console.log('============Found promotions ========');
                console.log("Found promotions = " + promotions.length);
                console.log(promotions);
//                db.collection('promotions').drop(function () {
                    db.close();
//                });
            });
        });
    });