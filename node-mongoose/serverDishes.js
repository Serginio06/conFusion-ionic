    var mongoose = require('mongoose')
        , assert = require('assert');
    var dishesModel = require('./models/dishes');
    var url = 'mongodb://localhost:27017/conFusion';
    mongoose.connect(url);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        //we're connected:
        console.log("Connected correctly to server");
        dishesModel.create({
            name: 'Uthapizza'
            , image: 'images/uthapizza.png'
            , category: 'mains'
            , label: 'Hot'
            , price: '$4.99'
            , description: 'Test'
            , comments: [
                {
                    rating: 3
                    , comment: 'This is insane'
                    , author: 'Sergii Ivanchenko'
                                    }

                                    ]
        }, function (err, dish) {
            if (err) throw err;
            console.log(' ================== Dish created! ==================');
            //            console.log(dish);
            //         console.log('=======================================');
            var id = dish._id;
            dishesModel.find({
                name: 'Uthapizza'
            }, function (err, mydish) {
                if (err) throw err;
                console.log("Count = " + mydish.length);
                console.log(mydish);
                console.log("================");
                console.log("$" + (mydish[0].price / 100).toFixed(2));
                db.collection('dishes').drop(function () {
                db.close()
                });
            });
        });
    });