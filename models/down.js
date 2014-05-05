/**
 * Created by palm on 14-5-5.
 */
var mongodb = require('./db');

function Down(down){
    this.user = down.username;
    this.pid = down.pid;
    this.ptype = down.ptype;
    this.comment = down.comment;
    this.sourceCode = down.sourceCode;
}

module.exports = Down;

Down.prototype.save = function save(callback) {
    var down = {
        user: this.user,
        pid : this.pid,
        ptype : this.ptype,
        comment : this.comment,
        sourceCode : this.sourceCode
    };

    mongodb.open(function(err, db) {
        if(err)
            return callback(err);
        db.collection('downs', function(err, collection) {
            if(err){
                mongodb.close();
                return callback(err);
            }
        })
    })
}