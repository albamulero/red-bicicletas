const passport = require('passport')
const LocalStorage = require('passport-local').Strategy
const Usuario = require('../models/usuario')

passport.use(new LocalStorage(

))

passport.serializeUser(function(user, cb) {
    cb(null, user.id)
})

passport.deserializeUser(function(id, cb) {
    Usuario.findById(id, function(err, usuario) {
        cb(err, usuario)
    })
})

module.exports = passport