var Bicicleta = function(id, modelo, color, ubicacion) {
    this.id = id;
    this.modelo = modelo;
    this.color = color;
    this.ubicacion = ubicacion
}

Bicicleta.prototype.toString = function (){
    return 'id: ' + this.id + 'color: ' + this.color;
}

Bicicleta.allBicis = []
Bicicleta.add = function(aBici){
    Bicicleta.allBicis.push(aBici);
}

Bicicleta.findById = function(aBiciID){
    var aBici = Bicicleta.allBicis.find(x => x.id == aBiciID);
    if (aBici)
        return aBici;
    else
        throw new Error(`No existe una bicicleta con con id ${aBiciID}`);
}

Bicicleta.removeById = function(aBiciID){
    var aBici = Bicicleta.findById(aBiciID);
    for(var i=0; i < Bicicleta.allBicis.length; i++){
        if(Bicicleta.allBicis[i].id == aBiciID){
            Bicicleta.allBicis.splice(i, 1);
            break;
        }
    }
}

var a = new Bicicleta(1, 'rojo', 'urbana', [-34.6012424, -58.3861497]);
var b = new Bicicleta(2, 'azul', 'montaña', [-34.765439, -58,9876322]);

Bicicleta.add(a);
Bicicleta.add(b)

module.exports = Bicicleta;