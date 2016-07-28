var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

//connection URL
var url = 'mongodb://localhost:27017/conFusion';
MongoClient.connect(url, function (err, db) {
   assert.equal (err, null);
   console.log("Connected correctly to server");
    
   var collection = db.collection("dishes") ;
    
// show current docs in collection
    collection.find({}).toArray(function (err, docs) {
           assert.equal(err, null);
            console.log("Found:");
            console.log(docs);
        });
    
    collection.insertOne ({name:"Uthapizza", description: "test"}, function (err, result) {
        assert.equal(err, null);
        console.log("After Insert:");
        console.log(result.ops);
        
        collection.find({}).toArray(function (err, docs) {
           assert.equal(err, null);
            console.log("Found:");
            console.log(docs);
//            db.close();
        
        db.dropCollection("dishes", function (err, result) {
           assert.equal(err, null);
            db.close();
            
        });
            
        });
        
        
    });
    
    
    
});








//var MongoClient = require('mongodb').MongoClient,
//    assert = require('assert');
//
////Connection URL
//var url = 'mongodb://localhost:27017/conFusion';
//// Use connect method to connect to the Server
//MongoClient.connect(url, function (err, db) {
//   assert.equal(err, null);
//   console.log("connected correctly to server");
//    
//    var collection = db.collection("dishes");
//    
//    collection.insertOne({name:"Uthapizza2", description: "test2"}, 
//        function (err, result) {
//            assert.equal(err,null);
//            console.log("After insert:");
//            console.log(result.ops);
//        
//        });
//    
//});