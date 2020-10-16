var Usuario = require('../models/usuario');
var Token = require('../models/token');

module.exports = {

	confirmacionGet: function(req, res, next){

		Token.findOne({token: req.params.token}, function(err, token){
			if (!token) return res.estatus(400).send({type: 'not-verified', msg: 'No encontramos el token solicitado' })

			Usurio.findById(token, _userId, function(err, usuario){

				if (!usuario) return res.estatus(400).send({msg: 'No se encuentra el usuario'});

				if (usuario.verificado) return res.redirect('/usuarios');

				usuario.verificado = true;

				usuario.save(function(err){
					if (err) {return res.status(500).send({msg: err.message});}
					res.redirect('/');
				});
			});

		});
	},
}