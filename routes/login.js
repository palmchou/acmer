/**
 * Created by Palm on 14-5-3.
 */
var express = require('express');
var User = require('../models/user.js');
var crypto = require('crypto');
var router = express.Router();
//var check = require('./isLogin.js');

var doGet  = function(req,res){
    res.render('login', {
        title: "Sign In"
    });
};

var doPost = function(req,res){
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    User.get(req.body.username, function(err, user) {
        if(!user) {
            req.flash('error', 'User does not exists.');
            return res.redirect('/login');
        }
        if (user.password != password) {
            req.flash('error', 'Wrong password');
            return res.redirect('/login');
        }
        req.session.user = user;
        req.flash('success', 'Login success');
        res.redirect('/');
    });
};

//router.get('/',check.cnlin);
router.get('/',doGet);
//router.post('/',check.cnlin);
router.post('/',doPost);

module.exports = router;