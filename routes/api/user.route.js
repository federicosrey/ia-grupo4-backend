var express = require('express')
var router = express.Router()
var UserController = require('../../controllers/users.controller');
var ContactoController = require('../../controllers/contacto.controller');
var EncuestaController = require('../../controllers/encuesta.controller');
var TarjetaController = require('../../controllers/tarjeta.controller');
var UserTarjetaController = require('../../controllers/usertarjeta.controller');
var Authorization = require('../../auth/authorization');

// Endpoints usuarios
router.post('/registration', UserController.createUser)
router.post('/login/', UserController.loginUser)
router.get('/tusuarios', UserController.getUsers)
router.put('/actualizacion', UserController.updateUser)
router.post('/usr', UserController.removeUser)

// Endpoints contacto
router.post('/contacto', ContactoController.createContacto)

//Endpoint tarjetas
router.post('/tarjeta', TarjetaController.agregarTarjeta)
router.get('/getTarjetas', TarjetaController.getTarjetas)
router.get('/getTarjeta', TarjetaController.getTarjeta)


//Enpoint tarjetas de usuarios
router.get('/getUserTarjetas', UserTarjetaController.getUserTarjetas)
router.post('/postUserTarjeta/idUsuario/:idUsuario/idTarjeta/:idTarjeta', UserTarjetaController.postUserTarjeta)

// Endpoints encuesta
router.post('/encuesta', EncuestaController.createEncuesta)
router.get('/tencuesta', EncuestaController.getEncuesta)
router.post('/bencuesta', EncuestaController.removeEncuesta)
router.post('/encuestaid', EncuestaController.getEncuestaID)
router.post('/encuestarepid', EncuestaController.getEncuestaRespID)
router.post('/encuestaResp', EncuestaController.createEncuestaResp)

module.exports = router;