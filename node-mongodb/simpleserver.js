var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

//Connection URL
var url = 'mongodb://localhost:27017/conFusion';
// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
   assert.equal(err, null);
   console.log("connected correctly to server");
    
    var collection = db.collection("dishes");
    
    collection.insertOne({name:"Uthapizza2", description: "test2"}, 
        function (err, result) {
            assert.equal(err,null);
            console.log("After insert:");
            console.log(result.ops);
        
        });
    
});