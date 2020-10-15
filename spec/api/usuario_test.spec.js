var mongooose = require('mongoose')
var Bicicleta = require('../../models/bicicleta')
var Usuario = require('../../models/usuario')
var Reserva = require('../../models/reserva')
const { bicicleta_delete_post } = require('../../controllers/bicicleta')

describe('Testing Usuarios', function() {
    beforeEach(function(done) {
        var mongoDB = 'mongoDB://localhost/testdb'
        mongooose.connect(mongoDB, { useNewUrlParser: true })

        const db = mongooose.connection
        db.on('err', console.error.bind(console, 'connection error'))
        db.once('open', function() {
            console.log('we are connectd to test databse');

            done()
        })
    })

    afterEach(function(donde) {
        Reserva.deleteMany({}, function(err, success) {
            if (err) console.log(err)
            Usuario.deleteMany({}, function(err, success){
                if (err) console.log(err)
                Bicicleta.deleteMany({}, function(err, success) {
                    if (err) console.log(err);
                    done()
                })
            })
        })
    })

    describe('Cuando un Usuario rserva una bici', () => {
        it ('desde existir la reserva', (donde) => {
            const usuario = new Usuario({ nombre: 'Alba' })
            usuario.save()
            const bicicleta = new Bicicleta({ color: 'azul', modelo: 'urbano'})
            bicicleta.save()

            var hoy = new Date()
            var mañana = new Date()
            mañana.setDate(hoy.getDate() + 1)
            usuario.resevar(bicicleta.id, hoy , mañana, function(err, reserva) {
                Reserva.find({}).populate('bicicleta').populate('usuario').exec( function(err, reservas){
                    console.log(reservas[0])
                    expect(reservas.length).toBe[1]
                    expect(reservas[0].diasDeReservas(1)).toBe(2)
                    expect(reservas[0].bicicleta.code).toBe(1)
                    expect(reservas[0].usuario.nombre).toBe(usuario.nombre)

                    done()
                })
            })
        })
    })

})