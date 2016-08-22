var express = require('express');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var hostname = 'localhost';
var port = 3000;
var app = express();
app.use(morgan('dev')); // Do login
app.use(cookieParser('12345-67890-09876-54321')); //secret key
//Check if user logged in and authorized for request data from server
function auth(req, res, next) {
    console.log(req.headers);
    
    if (!req.signedCookies.user) {
        var authHeader = req.headers.authorization; // get property authorization with pair user:password
        if (!authHeader) {
            var err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
            return;
        }
        var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
        var user = auth[0];
        var pass = auth[1];
        if (user == 'admin' && pass == 'password') {
            res.cookie('user','admin',{signed:true}); // set cookies after user loged in
            next(); //authorized
        }
        else {
            var err = new Error('Name of password are wrong! Please check and try again');
            err.status = 401;
            next(err);
        }
    } else {
        if (req.signedCookies.user === 'admin') {
        console.log(req.signedCookies);
            next();
        } else {
            var err = new Error('You are not authenticated with right Cookies!');
            err.status = 401;
            next(err);
        }
    }
}
// launch middleware - authorization function above - function auth (req, res, next)
app.use(auth);
app.use(express.static(__dirname + '/public'));
app.use(function (err, req, res, next) {
    res.writeHead(err.status || 500, {
        'WWW-Authenticate': 'Basic'
        , 'Content-Type': 'text/plain'
    });
    res.end(err.message);
});
app.listen(port, hostname, function () {
    console.log('Server running on http://Localhost:3000');
});