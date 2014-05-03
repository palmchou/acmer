/**
 * Created by palm on 14-5-3.
 */
var express = require('express');
var router = express.Router();
var Pnumber = 3055;

function doGet(req, res){
    var url = '';
    url += 'http://poj.org/problem?id=';
    url += getPID();
    res.redirect(url);
}

router.get('/',doGet);

module.exports = router;

function getPID() {
    return Math.ceil(Math.random()*Pnumber)+1000;
}