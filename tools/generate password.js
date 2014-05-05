/**
 * Created by palm on 14-5-5.
 */

var crypto = require('crypto');

process.stdin.setEncoding('utf8');

var temp ='';
process.stdin.on('readable', function() {
    var chunk = process.stdin.read();
    if (chunk !== null && chunk !=='\n')
        temp += chunk;
});

process.stdin.on('end', function() {
    console.log('after encode:\n' + getHash(temp));
});


function getHash(password) {
    return crypto.createHash('md5').update(password).digest('base64');
}
console.log('Give me your password: ');