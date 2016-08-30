var User = require('../models/user');
var jwt = require('jsonwebtoken'); // user to create sign, and verify tokens
var config = require('../config.js');

exports.getToken = function (user) {
    return jwt.sign(user, config.secretKey, {
        expiresIn: 3600
    });
};

exports.verifyOrdinaryUser = function (req, res, next) {
    
    //check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    
    //decode token
    if (token) {
      
        //verigies secret and checks exp
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
              var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                //if everything is good, save to request for use in other routes
                req.decoded = decoded;
                console.log('Decoded token: ', decoded);
                console.log('============================================');
                console.log('User ADMIN rights0: ',decoded._doc.admin);
                
                next();
            }
        });
    } else {
        // if there is no token, return an error
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};

// verify/authorize admin user
exports.verifyAdminUser = function (req, res, next) {
        //check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    
    //decode token
    if (token) {
      
        //verigies secret and checks exp
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
              var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else if (!decoded._doc.admin) {
                //there is no admin rights
                console.log('User ADMIN rights1: ',decoded._doc.admin);
                var err = new Error('You need to have admin rights to perform this operation!');
                err.status = 403;
                return next(err);
                
//                next();
            } else  {
                //if everything is good, save to request for use in other routes
                req.decoded = decoded;
//                console.log('Decoded Admin token: ', decoded);
//                console.log('============================================');
                console.log('User ADMIN rights2: ',decoded._doc.admin);
                next();
            }
            
        });
    } else {
        // if there is no token, return an error
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
    
}


