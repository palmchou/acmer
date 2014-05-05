/**
 * Created by Palm on 14-5-3.
 */

var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user.js');
//var check = require('./isLogin');


var doPost = function(req, res){
    //if user's password-repeat does not match password
    if(req.body['password-repeat'] != req.body['password']){
        req.flash('error','Password does not match');
        console.log('not match');
        return res.redirect('/reg');
    }

    //generate hash
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    var newUser = new User({
        name: req.body.username,
        password: password
    });

    User.get(newUser.name, function(err, user) {
        if(user)
            err = 'Username already exists.';
        if(err) {
            req.flash('error', err);
            return res.redirect('/reg');
        }
        newUser.save(function(err) {
            if(err) {
                req.flash('errror', err);
                return res.redirect('/reg');
            }
            req.session.user = newUser;
            req.flash('success', 'Sign up success');
            res.redirect('/');
        });
    });
}

var doGet = function(req, res){
    res.render('reg', {
        title: 'User Sign Up'
    });
}

//router.get('/', check.cnlin);
router.get('/',doGet);
//router.post('/', check.cnlin);
router.post('/',doPost);



module.exports = router;