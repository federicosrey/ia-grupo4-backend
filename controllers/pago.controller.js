var pagoService = require('../services/pago.service');
_this = this;

// Agrega venta del negocio
exports.agregarPago = async function (req, res, next) {
    
    var pago = {
        fecha: Date.now(),
        dniNegocio: req.body.dninegocio, 
        total: req.body.total
    }
    try {
        var agregandoPago = await pagoService.agregarPago(pago)
        return res.status(201).json({ data:agregandoPago, message: "Pago generado exitosamente" })
    } catch (e) {
        console.log(e)
        return res.status(400).json({ status: 400, message: "pago no pudo generarse" })
    }
}

exports.getPagos = async function (req, res, next) {

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 1000;
    
    try {
        var pagos = await pagoService.getPagos({}, page, limit)
        return res.status(200).json({ status: 200, data: pagos, message: "pagos recuperados exitosamente" });
    } catch (e) {

        return res.status(400).json({ status: 400, message: e.message });
    }
}
