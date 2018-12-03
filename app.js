var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
var fs = require("fs");
var multer = require('multer');
var upload = multer({
  dest: './uploads'
});

// 一般會員大頭貼
  app.post('/upload', upload.single('file'), function(req, res, next){
    fs.rename(req.file.path, "./public/uploads/" + req.file.originalname, function(err) {
      if (err) {
          throw err;
      }
      console.log('good!');
      res.redirect('http://localhost:3001/userc_account')
  })
});

// 店家會員大頭貼
app.post('/upload_logo', upload.single('file'), function(req, res, next){
  fs.rename(req.file.path, "./public/uploads/" + req.file.originalname, function(err) {
    if (err) {
        throw err;
    }
    console.log('good!');
    res.redirect('http://localhost:3001/userb_account')
})
});

// 店家橫幅
app.post('/upload_cover', upload.single('file_cover'), function(req, res, next){
  fs.rename(req.file.path, "./public/uploads/" + req.file.originalname, function(err) {
    if (err) {
        throw err;
    }
    console.log('good!');
    res.redirect('http://localhost:3001/userb_shop')
})
});

// 店家商品
app.post('/upload_commodity', upload.single('file'), function(req, res, next){
  fs.rename(req.file.path, "./public/uploads/" + req.file.originalname, function(err) {
    if (err) {
        throw err;
    }
    console.log('good!');
    res.redirect('http://localhost:3001/userb_commodity')
})
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
