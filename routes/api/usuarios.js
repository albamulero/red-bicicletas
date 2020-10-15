var espress = require('express')
var router = require.Router()
var usuarioController = require('../../controllers/api/usuarioControllerAPI')

router.get('/', usuarioController.usuarios_list)
router.post('/create', usuarioController.usuarios_create)
router.post('/reservar', usuarioController.usuarios_reservar)

module.exports = router