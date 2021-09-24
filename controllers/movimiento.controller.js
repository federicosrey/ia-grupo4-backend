var UserService = require('../services/user.service');
var tarjetaService = require('../services/tarjeta.service');
var movimientoService = require('../services/movimiento.service');
_this = this;

// Agrega venta del negocio
exports.agregarMovimiento = async function (req, res, next) {

    var movimiento = {
        dniUsuario: req.body.dniusuario,
        dniNegocio: req.body.dninegocio,
        numeroTarjeta: req.body.numerotarjeta,
        monto: req.body.monto
    }
    try {
        var agregandoMovimiento = await movimientoService.agregarMovimiento(movimiento)
        return res.status(201).json({ agregandoMovimiento, message: "movimiento generado exitosamente" })
    } catch (e) {
        console.log(e)
        return res.status(400).json({ status: 400, message: "movimiento no pudo generarse" })
    }
}

exports.getMovimientos = async function (req, res, next) {

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 1000;
    
    try {
        var movimientos = await movimientoService.getMovimientos({}, page, limit)
        return res.status(200).json({ status: 200, data: movimientos, message: "movimientos recuperados exitosamente" });
    } catch (e) {

        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getNMovimientos = async function (req, res, next) {

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 1000;
    
    try {
        var movimientos = await movimientoService.getNMovimientos({}, page, limit)
        return res.status(200).json({ status: 200, data: movimientos, message: "movimientos recuperados exitosamente" });
    } catch (e) {

        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.UpdateidLiquidacionMovimiento = async function (req, res, next) {

    var idMovimiento = req.body.idmovimiento;
    var idLiquidacion = req.body.idliquidacion;
    
    try {
        var agregandoMovimiento = await movimientoService.UpdateidLiquidacionMovimiento(idMovimiento,idLiquidacion)
        return res.status(201).json({ agregandoMovimiento, message: "movimiento generado exitosamente" })
    } catch (e) {
        console.log(e)
        return res.status(400).json({ status: 400, message: "movimiento no pudo generarse" })
    }
}

exports.UpdateidPagoMovimiento = async function (req, res, next) {

    var idMovimiento = req.body.idmovimiento;
    var idPago = req.body.idpago;
    
    try {
        var agregandoMovimiento = await movimientoService.UpdateidPagoMovimiento(idMovimiento,idPago)
        return res.status(201).json({ agregandoMovimiento, message: "movimiento generado exitosamente" })
    } catch (e) {
        console.log(e)
        return res.status(400).json({ status: 400, message: "movimiento no pudo generarse" })
    }
}

