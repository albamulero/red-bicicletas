var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('./config/passport')
const session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usuarios');
var tokenRouter = require('./routes/token')
var bicicletasRouter = require('./routes/bicicletas')
var bicicletasAPIRouter = require('./routes/api/bicicletas')
var usuariosApiRouter = require('./routes/api/usuarios')

var app = express();
app.use(session({
  cookie: {maxAge: 240 + 60 +  60 + 100},
  store: store,
  saveUninitialized: true,
  resave: 'true',
  secret: 'red_bicis_!![**]"1234"'
}))

var mongoose = require('mongoose');
const { StringDecoder } = require('string_decoder');
var mongoDB = 'mongodb://localhost/redbicicletas'
mongoose.connect(mongoDB, { useNewUrlParser: true })
mongoose.Promise = global.Promise
var db = mongoose.connection
db.on('error', console.error.bind(console, 'Mongo connection error'))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(passport.initiallizable())
app.use(passport.session())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/login', function(req, res){
  res.render('session/login')
})

app.post('/login', function(req, res) {
  //passport
})

app.get('/logout', function(req, res){
  res.render('/')
})

app.post('/forgotPassword', function(req, res) {
  
})

app.get('/forgotPassword', function(req, res){
  res.render('session/login')
})

app.use('/', indexRouter);
app.use('/usarios', usersRouter);
app.use('/bicicletas', bicicletasRouter)
app.use('/api/bicicletas', bicicletasAPIRouter)
app.use('/api/usuarios', usuariosApiRouter)
app.use('/token', tokenRouter)

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
