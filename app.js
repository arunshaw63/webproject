var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session=require('express-session');

var indexRouter = require('./routes/index');
var viewallpasswordRouter = require('./routes/view-all-password');
var addnewpasswordRouter = require('./routes/add-new-password');
var dashboardRouter = require('./routes/dashboard');
var addnewcategoryRouter = require('./routes/add-new-category');
var passwordCategoryRouter = require('./routes/passwordCategory');
var usersRouter = require('./routes/users');
var PassCatApi = require('./api/add_category');
var ProductApi = require('./api/product');
var UserApi = require('./api/users');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'e8n%d2B8Zt=u]\W>',
  resave: false,
  saveUninitialized: true,
  
}))
app.use('/', indexRouter);
app.use('/view-all-password', viewallpasswordRouter);
app.use('/dashboard', dashboardRouter);
app.use('/add-new-category', addnewcategoryRouter);
app.use('/passwordCategory',passwordCategoryRouter );
app.use('/add-new-password',addnewpasswordRouter );
app.use('/users', usersRouter);
app.use('/api', PassCatApi);
app.use('/productApi', ProductApi);
app.use('/userApi', UserApi);


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
  //res.render('error');
  res.status(404).json({
  	error:"page not found"
  })
   res.status(500).json({
  	error:"internal server error"
  })

});

module.exports = app;
