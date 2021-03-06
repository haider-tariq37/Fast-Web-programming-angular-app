var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../app/models/user.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile('login.html', { root: 'views' });
});

router.get('/profile', (req, res) => {
    if (req.cookies && req.cookies['stored_jwt'] != undefined && req.cookies['userid']) {
        const jsontoken = req.cookies['stored_jwt'];
        console.log('cookie found!');
        jwt.verify(jsontoken, 'privatekey', (err, authorizedData) => {
            if (err) {
                res.sendFile('login.html', { root: 'views' });
            } else {
                User.findOne({ _id: req.cookies['userid'] }, function(err, user) {
                    if (err) throw err;
                    birthday = user.birthday.toString();
                    birthday = birthday.split(" ")[1] + " " + birthday.split(" ")[2] + ", " + birthday.split(" ")[3];
                    res.send('<!DOCTYPE html> <html> <head> <title>User Profile</title> <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"> <script> function mouseontab(obj){ obj.style.backgroundColor = "rgb(39, 69, 132)"; } function mouseouttab(obj){ obj.style.backgroundColor = "rgb(59, 89, 152)"; } </script> <style> #delete-account{ background: linear-gradient(rgb(124, 10, 2), rgb(184, 70, 62)); color: white; height: 60px; width: 160px; border: 3px solid rgb(124, 10, 2); border-radius: 40px; position: absolute; right: 10px; top: 5px;} header{ background-color: rgb(59, 89, 152); position: absolute; top: 0; bottom: 0; width: 10%; } .fb-min-logo{ color: white; font-weight: bold; font-size: 100pt; margin: 30%; } .header-heading{ color: white; font-size: 18pt; } .division-lines{ color: gray; margin: 0 8% 0 8%; } .other-tab{ padding: 10% 0 10% 10%; } .full-name{ font-size: 40pt; font-weight: bold; padding: 0 20px 20px 0; margin-top: 100px; } .email, .gender, .dob{ font-size: 30pt; padding: 10px 0 10px 0; } </style> </head> <body> <div class="btn"> <form action="/api/deleteaccount" method="get"> <input type="submit" value="DELETE ACCOUNT" id="delete-account"> </form> </div> <header>      <div class="logo" onmouseover="mouseontab(this)" onmouseout="mouseouttab(this)"> <a style="text-decoration:none" href="http://localhost:8080/profile"><span class="fb-min-logo">f</span></a> </div> <div class="other-tab" onmouseover="mouseontab(this)" onmouseout="mouseouttab(this)"> <a style="text-decoration:none" href="http://localhost:8080/editprofile"><span class="header-heading">Edit Profile</span></a> </div> <div class="division-lines"> _____________ </div> <div class="other-tab" onmouseover="mouseontab(this)" onmouseout="mouseouttab(this)"> <a style="text-decoration:none" href="http://localhost:8080/changepassword"><span class="header-heading">Change Password</span></a> </div> <div class="division-lines"> _____________ </div> <div class="other-tab" onmouseover="mouseontab(this)" onmouseout="mouseouttab(this)"> <a style="text-decoration:none" href="http://localhost:8080/logout"><span class="header-heading">Logout</span></a> </div> </header> <div class="container"> <div class="row"> <div class="col-lg-4"></div> <div class="col-lg-4 full-name">' + user.first_name + ' ' + user.last_name + '</div> </div> <div class="row"> <div class="col-lg-4"></div> <div class="col-lg-4 email">' + user.email + '</div> </div> <div class="row"> <div class="col-lg-4"></div> <div class="col-lg-4 gender">' + user.gender + '</div> </div> <div class="row"> <div class="col-lg-4"></div> <div class="col-lg-4 dob">' + birthday + '</div> </div> </div> </body> </html>');
                });
            }
        });
    } else {
        return res.sendFile('login.html', { root: 'views' });
    }
});

router.get('/changepassword', (req, res) => {
    if (req.cookies && req.cookies['stored_jwt'] != undefined && req.cookies['userid']) {
        const jsontoken = req.cookies['stored_jwt'];
        console.log('cookie found!');
        jwt.verify(jsontoken, 'privatekey', (err, authorizedData) => {
            if (err) {
                return res.sendFile('login.html', { root: 'views' });
            } else {
                //                res.sendFile('userprofile.html', {root: "views"});
                User.findOne({ _id: req.cookies['userid'] }, function(err, user) {
                    if (err) throw err;
                    res.send('<!DOCTYPE html> <html> <head> <title>User Profile</title> <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"> <script> function mouseontab(obj){ obj.style.backgroundColor = "rgb(39, 69, 132)"; } function mouseouttab(obj){ obj.style.backgroundColor = "rgb(59, 89, 152)"; } </script> <style> header{ background-color: rgb(59, 89, 152); position: absolute; top: 0; bottom: 0; width: 10%; } .fb-min-logo{ color: white; font-weight: bold; font-size: 100pt; margin: 30%; } .header-heading{ color: white; font-size: 18pt; } .division-lines{ color: gray; margin: 0 8% 0 8%; } #current-tab{ background-color: rgb(19, 49, 112); padding: 10% 0 10% 10%; } .other-tab{ padding: 10% 0 10% 10%; } .label{ color: rgb(59, 89, 152); font-weight: bold; font-size: 16pt; } .container{ margin-top: 100px; } .row{ padding: 20px 0 20px 0; } .text-input{ border: 3px solid rgb(59, 89, 152); height: 40px; width: 300px; } #confirm-password-text-input{ margin-top: 15px; } #change-button{ background: linear-gradient(rgb(59, 89, 152), rgb(119, 149, 212)); color: white; height: 60px; width: 110px; border: 3px solid rgb(59, 89, 152); border-radius: 40px; } </style> </head> <body> <header> <div class="logo" onmouseover="mouseontab(this)" onmouseout="mouseouttab(this)"> <a style="text-decoration:none" href="http://localhost:8080/profile"><span class="fb-min-logo">f</span></a> </div> <div class="other-tab" onmouseover="mouseontab(this)" onmouseout="mouseouttab(this)"> <a style="text-decoration:none" href="http://localhost:8080/editprofile"><span class="header-heading">Edit Profile</span></a> </div> <div class="division-lines"> ____________ </div> <div id="current-tab"> <a style="text-decoration:none" href="http://localhost:8080/changepassword"><span class="header-heading">Change Password</span></a> </div> <div class="division-lines"> ___________ </div> <div class="other-tab" onmouseover="mouseontab(this)" onmouseout="mouseouttab(this)"> <a style="text-decoration:none" href="http://localhost:8080/logout"><span class="header-heading">Logout</span></a> </div> </header> <div class="container"> <form action="/api/changepassword" method="post"> <div class="row"> <div class="col-lg-9"></div> <div class="col-lg-3"> <input type="submit" value="UPDATE" id="change-button"> </div> </div> <div class="row"> <div class="col-lg-2"></div> <div class="col-lg-2 label">Old Password</div> <div class="col-lg-5"><input type="password" name="old_password" class="text-input"></div> <div class="col-lg-3"></div> </div> <div class="row"> <div class="col-lg-2"></div> <div class="col-lg-2 label">New Password</div> <div class="col-lg-5"><input type="password" name="new_password" class="text-input"></div> <div class="col-lg-3"></div> </div> <div class="row"> <div class="col-lg-2"></div> <div class="col-lg-2 label">Confirm Password</div> <div class="col-lg-5"><input type="password" name="confirm_password" class="text-input" id="confirm_password-text-input"></div> <div class="col-lg-3"></div> </div> </form> </div> </body> </html>');
                });
            }
        });
    } else {
        return res.sendFile('login.html', { root: 'views' });
    }
});

router.get('/editprofile', (req, res) => {
    if (req.cookies && req.cookies['stored_jwt'] != undefined && req.cookies['userid']) {
        const jsontoken = req.cookies['stored_jwt'];
        console.log('cookie found!');
        jwt.verify(jsontoken, 'privatekey', (err, authorizedData) => {
            if (err) {
                return res.sendFile('login.html', { root: 'views' });

            } else {
                User.findOne({ _id: req.cookies['userid'] }, function(err, user) {
                    if (err) throw err;
                    res.send('<!DOCTYPE html> <html> <head> <title>User Profile</title> <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"> <script> function mouseontab(obj){ obj.style.backgroundColor = "rgb(39, 69, 132)"; } function mouseouttab(obj){ obj.style.backgroundColor = "rgb(59, 89, 152)"; } </script> <style> header{ background-color: rgb(59, 89, 152); position: absolute; top: 0; bottom: 0; width: 10%; } .fb-min-logo{ color: white; font-weight: bold; font-size: 100pt; margin: 30%; } .header-heading{ color: white; font-size: 18pt; } .division-lines{ color: gray; margin: 0 8% 0 8%; } #current-tab{ background-color: rgb(19, 49, 112); padding: 10% 0 10% 10%; } .other-tab{ padding: 10% 0 10% 10%; } .label{ color: rgb(59, 89, 152); font-weight: bold; font-size: 16pt; } .container{ margin-top: 100px; } .row{ padding: 20px 0 20px 0; } .text-input{ border: 3px solid rgb(59, 89, 152); height: 40px; width: 300px; } #confirm-password-text-input{ margin-top: 15px; } #change-button{ background: linear-gradient(rgb(59, 89, 152), rgb(119, 149, 212)); color: white; height: 60px; width: 110px; border: 3px solid rgb(59, 89, 152); border-radius: 40px; }  </style> </head> <body> <header> <div class="logo" onmouseover="mouseontab(this)" onmouseout="mouseouttab(this)"> <a style="text-decoration:none" href="http://localhost:8080/profile"><span class="fb-min-logo">f</span></a> </div> <div id="current-tab"> <a style="text-decoration:none" href="http://localhost:8080/editprofile"><span class="header-heading">Edit Profile</span></a> </div> <div class="division-lines"> __________ </div> <div class="other-tab" onmouseover="mouseontab(this)" onmouseout="mouseouttab(this)"> <a style="text-decoration:none" href="http://localhost:8080/changepassword"><span class="header-heading">Change Password</span></a> </div> <div class="division-lines"> __________ </div> <div class="other-tab" onmouseover="mouseontab(this)" onmouseout="mouseouttab(this)"> <a style="text-decoration:none" href="http://localhost:8080/logout"><span class="header-heading">Logout</span></a> </div> </header> <div class="container"> <form action="/api/updateinfo"method="post"> <div class="row"> <div class="col-lg-9"></div> <div class="col-lg-3"> <input type="submit" value="UPDATE" id="change-button"> </div> </div> <div class="row"> <div class="col-lg-2"></div> <div class="col-lg-2 label">First Name</div> <div class="col-lg-5"><input type="text" name="first_name" class="text-input" value="' + user.first_name + '"></div> <div class="col-lg-3"></div> </div> <div class="row"> <div class="col-lg-2"></div> <div class="col-lg-2 label">Surname</div> <div class="col-lg-5"><input type="text" name="lastname" class="text-input" value="' + user.last_name + '"></div> <div class="col-lg-3"></div> </div> <div class="row"> <div class="col-lg-2"></div> <div class="col-lg-2 label">Email</div> <div class="col-lg-5"><input type="email" name="email" class="text-input" value="' + user.email + '"></div> <div class="col-lg-3"></div> </div> </form> <div class="row"> <div class="col-5"></div> <div class="col-2">  </div> <div class="col-5"></div> </div> </div> </body> </html>');
                });

            }
        });
    } else {
        return res.sendFile('login.html', { root: 'views' });

    }
});

router.get('/logout', (req, res) => {
    if (req.cookies && req.cookies['stored_jwt'] != undefined) {
        res.clearCookie('stored_jwt');
    }
    return res.sendFile('login.html', { root: 'views' });
});


module.exports = router;