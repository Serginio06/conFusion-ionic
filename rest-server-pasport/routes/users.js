var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Verify = require('./verify');

/* GET users listing. */
router.get('/', Verify.verifyAdminUser, function(req, res, next) {
//  res.send('respond with a resource');
  User.find({}, function (err, users) {
      if (err) { throw err;}
        res.json(users);
      
      
  })    
});

// Post method to register new user
router.post('/register', function (req, res) {
    User.register(new User ({username: req.body.username}),
                  req.body.password, function (err, user) {
                      if (err) {
                      return res.status(500).json({err: err});
                      }
        
                    passport.authenticate('local')(req, res, function () {
                        return res.status(200).json({status:'Registration Successful!'});
                    });
                  });
});

// post method to login existing user
router.post('/login', Verify.verifyAdminUser, function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
          return next(err);
        }
        if (!user) { //error if user empty, or wrong password, or user does not exist etc.
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function (err) {
            if (err) {
              return res.status(500).json({
                  err: 'Could not log in user'
              });
            }
            
            console.log('User in users: ', user);
            
            var token = Verify.getToken(user);
            
            res.status(200).json ({
                status: 'Login successful!',
                success: true,
                token: token
            });
        });
    })(req, res, next);
});

// Logout 
router.get('/logout', function (req, res) {
    req.logout();
    res.status(200).json({
        status: 'Bye!'
    });
});




module.exports = router;
