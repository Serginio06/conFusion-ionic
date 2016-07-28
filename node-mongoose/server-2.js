 var mongoose = require('mongoose')
     , assert = require('assert');

 var dishesModel = require('./models/dishes-1');
 var url = 'mongodb://localhost:27017/conFusion';
 mongoose.connect(url);

 var db = mongoose.connection;
 db.on('error', console.error.bind(console, 'connection error:'));
 db.once('open', function () {
     //we're connected:
     console.log("Connected correctly to server");
     
     dishesModel.create({
         name: 'Uthapizza',
         description: 'Test'
     }, function (err, dish) {
         if (err) throw err;
         
         console.log(' ================== Dish created! ==================');
         console.log(dish);
//         console.log('=======================================');
         var id = dish._id;
         
         //get all dishes after timeout
         setTimeout (function () {
             dishesModel.findByIdAndUpdate(id,{
                 $set: {descripttion: 'Updated test' }
             },{
                 new: true
               })
             .exec(function (err, dish) {
                 if (err) throw err;
                 console.log('================== Updated dish! ==================');
                 console.log(dish);
//                 console.log('=======================================');
                 
                 db.collection('dishes').drop(function () {
                     db.close();
                 });
                 
             });
         },3000);
         
     });
     
     
     
 });


