var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');

var app = express();

// MONGODB
const mongoose = require('mongoose');
mongoose.connect('mongodb://charuniverse:charuniverse@cluster0-shard-00-00.2dd5e.gcp.mongodb.net:27017,cluster0-shard-00-01.2dd5e.gcp.mongodb.net:27017,cluster0-shard-00-02.2dd5e.gcp.mongodb.net:27017/db_charuniverse?ssl=true&replicaSet=atlas-12tpyf-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
