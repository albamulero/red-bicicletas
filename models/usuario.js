var mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
var Reserva = require('./reserva');


const bcrypt = require('bcrypt');
const crypto = require('crypto');
const saltRounds = 10; // Constante de salto de encriptacion...

const Token = require('../models/token');
const nodemailer = require('nodemailer');

var Schema = mongoose.Schema;

/*const validateEmail = function(email) {
    const re = /^\w+([\,-]?\w+)+@\w([\,-!?\w+)*(\,\w{2,3}]+$/
    return re.test(email())
}*/

var usuarioSchema = new Schema ({
    nombre: {
        type: String,
        trin: true,
        required: [true, 'El nombre es o0bligatorio']
    },
    email: {
        type: String, 
        trin: true, 
        required: [true, 'El email es obligatorio'],
        lowercase: true,
        unique: true,
        //validate: [validateEmail, 'Por favor, ingrese un email valido'],
        //match: [/^\w+([\,-]?\w+)+@\w([\,-!?\w+)*(\,\w{2,3}]+$/]
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    }, 
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    verificado: {
        type: Boolean, 
        default: false
    }

})

usuarioSchema.plugin(uniqueValidator, { message: 'El {PATH} ya existe con otro usuario' });

usuarioSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        this.password = bcrypy.hashSync(this.password, saltRounds)
    }
    next()
})

usuarioSchema.methods.validPassrord = function(password) {
    return bcrypy.compareSync(password, this.password)
}

usuarioSchema.methods.reservar = function(biciID, desde, hasta, cb) {
    var reserva = new Reserva({ usuario: this._id, bicicleta: biciID, desde: desde, hasta: hasta })
    console.log(reserva)
    reserva.save(cb)
}

usuarioSchema.methods.enviar_email_bienvenida = function(cb) {

    const token = new Token({ _userId: this.id, token: crypto.randomBytes(16).toString('hex') });
    const email_destination = this.email;

    token.save(function(err) {
        if (err) { return console.log(err.message); }

        nodemailer.createTestAccount((err, account) => {
            if (err) {
                console.error('Fallo la creacion del est en la cuenta' + err.message);
                return process.exit(1);
            }

            console.log('Credenciales obtenidas...');

            let transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'grayce.wisoky91@ethereal.email',
                    pass: 'jPSQmHGsVJZSWhc3sR'
                }

            });

            let message = {
                from: 'cmulero83@icloud.com',
                to: 'grayce.wisoky91@ethereal.email',
                subject: 'Nodemailr is unicode friendly',
                text: 'Hola mundo...',
                html: '<p><b>Hola</b> mundo...</p>'
            };

            transporter.sendMail(message, (err, info) => {
                if (err) {
                    console.log('Ocurrio un error', +err.message);
                    return process.exit(1);
                }

                console.log('Mensaje enviado:  %s ', info.messageId);
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            });


        })


    });



}


module.exports = mongoose.model('Usuario', usuarioSchema)
