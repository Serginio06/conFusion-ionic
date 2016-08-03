var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Dishes = require('../models/dishes');

var dishRouter = express.Router();
dishRouter.use(bodyParser.json());


dishRouter.route('/')

    .get(function(req,res,next){
        Dishes.find({}, function (err, dish) {
            if (err) throw err;
            res.json(dish);
            
        })
})

.post(function(req, res, next){
    
    Dishes.create(req.body, function (err, dish) {
        if (err) throw err;
        
        console.log('Dish created');
        var id= dish._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        
        res.end('Added the dish with id: '+ id);
    });
})

.delete(function(req, res, next){
    
        Dishes.remove ({}, function (err, resp) {
            if (err) throw err;
            res.json(resp);
            
        })
    
        
    
});
// finish route with 

dishRouter.route('/:dishId')


.get(function(req,res,next){
    Dishes.findById (req.params.dishId, function (err, dish) {
        if (err) {
        throw err;
        }
        res.json(dish);
    })    
    
})

.put(function(req, res, next){
    Dishes.findByIdAndUpdate (req.params.dishId, {
        $set: req.body
    },{
        new: true
    }, function (err, dish) {
        if (err) throw err;
        res.json(dish);
    })    
    
    
})

.delete(function(req, res, next){
    
    Dishes.remove(req.params.dishId, function (err, resp) {
        if (err) throw err;
        
        res.json(resp);
    });
    
    
});

dishRouter.route('/:dishId/comments')

.get( function (req, res, next) {
    
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        
        res.json(dish.comments);
    });
    
})

.post( function (req, res, next) {
    
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        
        dish.comments.push(req.body);
        dish.save(function (err, dish) {
            if (err) throw err;
            
            console.log('updated Comments!');
            
            res.json(dish);
        });
        
    });
    
})

.delete(function (req, res, next) {
   
    Dishes.findById (req.params.dishId, function (err, dish) {
        if (err) throw err;
        
        dish.comments = [];
        
       dish.save(function (err, resp) {
            if (err) throw err;
            
            console.log('All Comments were updated!');

        });
        
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        
        res.end('All comments were deleted for dish with id: '+ dish._id);
        
        
    });
    
});

//dishRouter.route('/:dishid/comments/:commentId')
  dishRouter.route('/:dishId/comments/:commentId')

.get(function (req, res, next) {
    
    Dishes.findById (req.params.dishId, function (err, dish) {
        if (err) throw err;
        
        console.log(req.params.commentId);
//        console.log(dish.comments.id(req.params.commentId));
//        console.log(dish.comments);
        res.json(dish.comments.id(req.params.commentId));
        
    });
    
//    Dishes.findById(req.params.dishId, function (err, dish) {
//        if (err) throw err;
//        
//        res.json(dish.comments);
//    });
})

.put(function (req, res, next) {
    //we delete the existing comment and insert the updated comment as new comment
    
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        
        dish.comments.id(req.params.commentId).remove();
        dish.comments.push(req.body);
        
        dish.save(function (err, resp) {
            if (err) throw err;
            
            console.log('Comment was updated!');
            
            res.json(resp);
        });
        
    });
    
    
})

.delete (function (req, res, next) {
    
    Dishes.findById (req.params.dishId, function (err, dish) {
        if (err) throw err;
        
        dish.comments.id(req.params.commentId).remove();
        
        dish.save(function (err, resp) {
            if (err) throw err;
            
            console.log('Comment was deleted!');
            
            res.json(resp);
        });
    });
    
});

module.exports = dishRouter;

// Example of dish to add to mongoDB
//
//{
//    "name": "Uthapizza",
//    "image": "images/uthapizza.png",
//    "category": "mains",
//    "label": "Hot",
//    "price": "4.99",
//    "description": "A unique combination of Indian and Italian pizza"
//}
//
//Example to add comments
// "comments": [
//    {
//      "rating": 5,
//      "comment": "Imagine all the eatables living in conFusion",
//      "author": "Sergii Ivanchenko"
//    },
//    {
//      "rating": 4,
//      "comment": "Sends anynoe to heaven, i wish I could get my mother in low to eat it",
//      "author": "Paul MeVites"
//    }