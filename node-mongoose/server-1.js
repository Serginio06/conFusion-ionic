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
     
     //create new dish
     var newDish = dishesModel({
         name: 'Uthapizza'
         , description: 'Test'
     });
     
     //save the dish
     newDish.save(function (err) {
         if (err) throw err;
         
         console.log('Dish created!');
        
         // get all the dishes
         dishesModel.find({},function (err, dishes) {
             if (err) throw err;
             
             //object of all the dishes
             console.log(dishes);
             
             //close conenction to db
             db.collection('dishes').drop(function () {
                 db.close();
             });
                 
         });
         
     });
     
     
     
 });