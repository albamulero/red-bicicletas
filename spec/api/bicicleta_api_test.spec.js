var Bicicleta = require('../../models/bicicleta')
var request = require('request')
var server = require('../../bin/www')

var base_url = 'http://localhost:5000/api/biciletas'

describe('Bicicleta API', () => {
    describe('GET BICICLETAS /', () => {
        it('Status 200', () => {
            expect(Bicicleta.allBicis.length).toBe(0)

            var a = new Bicicleta(1, 'negro', 'urbano', [-54.345, -54.2345])
            Bicicleta.add(a)

            request.get('http://localhost:5000/api/bicicletas', function(err, response, body){
                expect(response.statusCode).toBe(200)
            })
        })
    })
    
    describe('POST BICICLETAS /create', () => {
        it('Status 200', (done) => {
            var headers = {'content.type' : 'aplication/json'}
            var aBici = `{ "id':10, "color": "rojo", "modelo":"urbano", "lat":-34, "lng":-54 }`
            request.post({
                headers: headers,
                url: 'http://localhost:5000/api/create',
                body: aBici
                }, function(err, response, body) {
                    expect(response.statusCode).toBe(200)
                    expect(Bicicleta.findById(10).color).toBe("rojo")
                    done()
                
            })
        })
    })
})

