 var mongoose = require('mongoose')
     , assert = require('assert');
 var dishesModel = require('./models/dishes-3');
 var url = 'mongodb://localhost:27017/conFusion';
 mongoose.connect(url);
 var db = mongoose.connection;
 db.on('error', console.error.bind(console, 'connection error:'));
 db.once('open', function () {
     //we're connected:
     console.log("Connected correctly to server");
     
     dishesModel.create({
         name: 'Uthapizza'
         , description: 'Test'
         , comments: [
             {
                 rating: 3
                 , comment: 'This is insane'
                 , author: 'Sergii Ivanchenko'
         }
             
             , {
                 rating: 1
                 , comment: 'This is Second comment'
                 , author: 'Sergii Ivanchenko'
         }
         ]
     }, function (err, dish) {
         if (err) throw err;
         console.log(' ================== Dish created! ==================');
         console.log(dish);
         //         console.log('=======================================');
         var id = dish._id;
         //get all dishes after timeout
         setTimeout(function () {
             dishesModel.findByIdAndUpdate(id, {
                 $set: {
                     description: 'Updated test'
                 }
             }, {
                 new: true
             }).exec(function (err, dish) {
                 if (err) throw err;
                 console.log('================== Updated dish! ==================');
                 console.log(dish);
                 //                 console.log('=======================================');
                 // Add new comment for existing dish
                 dish.comments.push({
                     rating: 5
                     , comment: 'This is Updated Third comment'
                     , author: 'Sergii Ivanchenko'
                 });
                 
                 dish.save(function (err, dish) {
                     console.log('================== Updated comments ==================');
                     console.log(dish);
                     
                 
                     db.collection('dishes').drop(function () {
                         db.close();
                     });
                 });
             });
         }, 3000);
     });
 });