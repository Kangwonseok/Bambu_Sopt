var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var users = require('./routes/users');

var total_board = require('./routes/total_board');

var board_notice = require('./routes/board_notice');
var board_thunder = require('./routes/board_thunder');
var board_bambu = require('./routes/board_bambu');

var thumbnails_notice = require('./routes/thumbnails_notice');
var thumbnails_thunder = require('./routes/thumbnails_thunder');
var thumbnails_bambu = require('./routes/thumbnails_bambu');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);

app.use('/total_board', total_board);

app.use('/board_notice', board_notice);
app.use('/board_thunder', board_thunder);
app.use('/board_bambu', board_bambu);

app.use('/thumbnails_notice', thumbnails_notice);
app.use('/thumbnails_thunder', thumbnails_thunder);
app.use('/thumbnails_bambu', thumbnails_bambu);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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
