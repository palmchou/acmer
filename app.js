var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');

var session = require('express-session');
var MongoStone = require('connect-mongo')(session);
var settings = require('./settings');

//routers
var index = require('./routes/index');
var users = require('./routes/users');
var random = require('./routes/random');
var login = require('./routes/login');
var logout = require('./routes/logout');
var reg = require('./routes/reg');
var team = require('./routes/team');
var treg = require('./routes/treg');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view options', {

});

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: settings.cookieSecret,
    store: new MongoStone({
        db: settings.db
    })
}));
app.use(flash());

app.use(function(req, res, next){
    res.locals.user = req.session.user;
    var error = req.flash('error');
    res.locals.error = error.length?error:null;

    var succ = req.flash('success');
    res.locals.success = succ.length?succ:null;
    next();
});

app.use('/', index);
app.use('/u', users);
app.use('/random', random);
app.use('/login', login);
app.use('/logout', logout);
app.use('/reg', reg);
app.use('/treg', treg);
app.use('/t', team);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
