/**
 * Created by Palm on 14-5-3.
 */
var express = require('express');
var router = express.Router();

function doGet(req, res) {
    res.send('Team reg page');
}

function doPost(req, res) {
    res.send('Team reg Post method page');
}

router.get('/', doGet);
router.post('/', doPost);

module.exports = router;