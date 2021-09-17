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

