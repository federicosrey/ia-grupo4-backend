var express = require('express')
var router = express.Router()
var UserController = require('../../controllers/users.controller');
var ContactoController = require('../../controllers/contacto.controller');
var EncuestaController = require('../../controllers/encuesta.controller');
var TarjetaController = require('../../controllers/tarjeta.controller');
var UserTarjetaController = require('../../controllers/usertarjeta.controller');
var MovimientoController = require('../../controllers/movimiento.controller');
var LiquidacionController = require('../../controllers/liquidacion.controller');
var CobroController = require('../../controllers/cobro.controller');
var PagoController = require('../../controllers/pago.controller');
var Authorization = require('../../auth/authorization');

// Endpoints usuarios
router.post('/registration', UserController.createUser)
router.post('/login/', UserController.loginUser)
router.get('/tusuarios', UserController.getUsers)
router.put('/actualizacion', UserController.updateUser)
router.post('/usr', UserController.removeUser)
router.post('/getInfoUsuario', UserController.getInfoUsuario)

// Endpoints contacto
router.post('/contacto', ContactoController.createContacto)

//Endpoint tarjetas
router.post('/tarjeta', TarjetaController.agregarTarjeta)
router.get('/getTarjetas', TarjetaController.getTarjetas)
router.get('/getTarjeta', TarjetaController.getTarjeta)

router.post('/asignarTarjeta', UserTarjetaController.asignarTarjeta)
router.post('/agregarMovimiento', MovimientoController.agregarMovimiento)
router.get('/getMovimientos', MovimientoController.getMovimientos)
router.get('/getNMovimientos', MovimientoController.getNMovimientos)
router.post('/getUMovimientos', MovimientoController.getUMovimientos)

router.post('/UpdateidLiquidacionMovimiento', MovimientoController.UpdateidLiquidacionMovimiento)
router.post('/UpdateidPagoMovimiento', MovimientoController.UpdateidPagoMovimiento)

router.post('/postLiquidaciones', LiquidacionController.postLiquidaciones)
router.post('/getLiquidaciones', LiquidacionController.getLiquidaciones)
router.post('/UpdateidCobroLiquidacion', LiquidacionController.UpdateidCobroLiquidacion)

router.post('/agregarCobro', CobroController.agregarCobro)
router.get('/getCobros', CobroController.getCobros)

router.post('/agregarPago', PagoController.agregarPago)
router.get('/getPagos', PagoController.getPagos)

// Endpoints encuesta
router.post('/encuesta', EncuestaController.createEncuesta)
router.get('/tencuesta', EncuestaController.getEncuesta)
router.post('/bencuesta', EncuestaController.removeEncuesta)
router.post('/encuestaid', EncuestaController.getEncuestaID)
router.post('/encuestarepid', EncuestaController.getEncuestaRespID)
router.post('/encuestaResp', EncuestaController.createEncuestaResp)

module.exports = router;