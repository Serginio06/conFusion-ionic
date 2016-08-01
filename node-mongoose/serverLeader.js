    var mongoose = require('mongoose')
        , assert = require('assert');
    var leadersModel = require('./models/leaders');
    var url = 'mongodb://localhost:27017/conFusion';
    mongoose.connect(url);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        //we're connected:
        console.log("Connected correctly to server");
        leadersModel.create({
            name: 'Peter Pan',
            image: 'images/alberto.png',
            designation: 'Chief Epicuriouse Officer',
            abbr: 'CEO',
            description: 'Our CEO, Peter,...'
        }, function (err, leader) {
            console.log("befor throw");
            if (err) throw err;
            console.log(' ================== leader created! ==================');
                        console.log(leader);
            //         console.log('=======================================');
            var id = leader._id;
            leadersModel.find({
                abbr: 'CEO'
            }, function (err, leaders) {
                console.log('============Found leaders ========');
                console.log("Found leaders = " + leaders.length);
                console.log(leaders);
//                db.collection('leaders').drop(function () {
                    db.close();
//                });
            });
        });
    });