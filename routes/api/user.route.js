var express = require('express')
var router = express.Router()
var UserController = require('../../controllers/users.controller');
var TarjetaController = require('../../controllers/tarjeta.controller');
var UserTarjetaController = require('../../controllers/usertarjeta.controller');
var MovimientoController = require('../../controllers/movimiento.controller');
var LiquidacionController = require('../../controllers/liquidacion.controller');
var CobroController = require('../../controllers/cobro.controller');
var PagoController = require('../../controllers/pago.controller');
var Authorization = require('../../auth/authorization');
const { getMontosaCobrarxConsumosClientes } = require('../../services/movimiento.service');

// Endpoints usuarios
router.post('/registration', UserController.createUser)
router.post('/login/', UserController.loginUser)
router.get('/tusuarios', UserController.getUsers)
router.put('/actualizacion', UserController.updateUser)
router.post('/usr', UserController.removeUser)
router.post('/getInfoUsuario', UserController.getInfoUsuario)

//Endpoint tarjetas
router.post('/tarjeta', TarjetaController.agregarTarjeta)
router.get('/getTarjetas', TarjetaController.getTarjetas)
router.get('/getTarjeta', TarjetaController.getTarjeta)
router.post('/asignarTarjeta', UserTarjetaController.asignarTarjeta)

//Endpoint Movimientos
router.post('/agregarMovimiento', MovimientoController.agregarMovimiento)
router.get('/getMovimientos', MovimientoController.getMovimientos)
router.post('/getNMovimientos', MovimientoController.getNMovimientos)
router.post('/getUMovimientos', MovimientoController.getUMovimientos)
router.post('/getMontosaPagaraEstablecimientostcb',MovimientoController.getMontosaPagaraEstablecimientos)
router.post('/getMontosaCobrarxConsumosClientestcb',MovimientoController.getMontosaCobrarxConsumosClientes)
router.post('/UpdateidLiquidacionMovimiento', MovimientoController.UpdateidLiquidacionMovimiento)
router.post('/UpdateidPagoMovimiento', MovimientoController.UpdateidPagoMovimiento)

//Endpoint Liquidaciones
router.post('/postLiquidaciones', LiquidacionController.postLiquidaciones)
router.post('/getLiquidaciones', LiquidacionController.getLiquidaciones)
router.post('/UpdateidCobroLiquidacion', LiquidacionController.UpdateidCobroLiquidacion)

//Endpoint Cobros
router.post('/agregarCobro', CobroController.agregarCobro)
router.get('/getCobros', CobroController.getCobros)

//Endpoint Pagos
router.post('/agregarPago', PagoController.agregarPago)
router.get('/getPagos', PagoController.getPagos)

module.exports = router;