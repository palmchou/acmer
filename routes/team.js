/**
 * Created by Palm on 14-5-3.
 */

var express = require('express');
var router = express.Router();

router.get('/:team',doGet);

function doGet(req, res) {
    res.send('teampage \n Hi, '+ req.params.team +' team');
}





module.exports = router;