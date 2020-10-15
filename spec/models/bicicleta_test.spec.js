//const { allBicis } = require('../../models/bicicleta')
var mongoose = require('mongoose')
var Bicicleta = require('../../models/bicicleta')

describe('Testing Bicicletas', function() {
    beforeEach(function(done) {
        var mongoDB = 'mongo://localhost/testdb'
        mongoose.connect(mongoDB, { userNewUrlParser: true })

        const db = mongoose.connection
        db.on('error', console.error.bind(console, 'connection error'))
        db.once('open', function() {
            console.log('We are connected to test database')
        })
    })

    afterEach( function() {
        Bicicleta.deleteMany({}, function(err, success) {
            if (er) console.log(err)
            done()
        })
    })

    describe('Bicicleta.createInstace', () => {
        it('crea una instaciia de bicialeta', () => {
            var bici = Bicicleta.createInstace(1, 'verde', 'urbana', [-43.23433, -34.2345])

            expect(bici.code).toBe(1)
            expect(bici.color).toBe('verde')
            expect(bici.modelo).toBe('urbana')
            expect(bici.ubicacion[0]).toBe(-43.23433)
            expect(bici.ubicacion[1]).toBe(-34.2345)
        })
    })

    describe('Bicicleta.allBicis', () => {
        it('comienza vacia', (donde) => {
            Bicicleta.allBicis(function(err, bicis) {
                expect(bicis.length).toBe(0)
                done()
            })
        })
    })

    describe('Bicicletas.add', () => {
        it('agrega solo una bici', (donde) => {
            var aBici1 = new Bicicleta ({ code: 1, color: 'verde', modelo: 'urbana' })
            Bicicleta.add(aBici1, function(err, newBici) {
                if(err) console.log(err)
                Bicicleta.allBicis(function(err, bicis) {
                    expect(bicis.length).toEqual(1)
                    expect(bicis[0].code).toEqual(aBici1.code)
                    
                    done()
                })   
            })
        })
    })

})

/*beforeEach(() => { Bicicleta.allBicis = []; })

describe('Bicicleta.allBicis', () => {
    it('comienza vacia', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
    });
});

describe('Bicicleta.add', () => {
    it('agregamos una', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        
        var a = new Bicicleta(1, 'rojo', 'urbana', [-12.2345, -12.3456]);
        Bicicleta.add(a)

        expect(Bicicleta.allBicis.length).toBe(1)
        expect(Bicicleta.allBicis[0]).toBe(a)
    })
})

describe('Bicicleta.findById', ()  => {
    it('debe devolver la bici con el ID 1', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        
        var aBici1 = new Bicicleta(1, 'verde', 'urbana')
        var aBici2 = new Bicicleta(2, 'verde', 'urbana')

        Bicicleta.add(aBici1)
        Bicicleta.add(aBici2)

        var targetBici = Bicicleta.findById(1)
        expect(targetBici.id).toBe(1)
        expect(targetBici.color).toBe(aBici1.color)
        expect(targetBici.modelo).toBe(aBici1.modelo)
    })
})*/