var cobroService = require('../services/cobro.service');
_this = this;

// Agrega venta del negocio
exports.agregarCobro = async function (req, res, next) {

    var cobro = {
        fecha: Date.now(),
        dniUsuario: req.body.dniUsuario, 
        total: req.body.total
    }
    try {
        var agregandoCobro = await cobroService.agregarCobro(cobro)
        return res.status(201).json({ data:agregandoCobro, message: "Cobro generado exitosamente" })
    } catch (e) {
        console.log(e)
        return res.status(400).json({ status: 400, message: "Cobro no pudo generarse" })
    }
}

exports.getCobros = async function (req, res, next) {

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 1000;
    
    try {
        var cobros = await cobroService.getCobros({}, page, limit)
        return res.status(200).json({ status: 200, data: cobros, message: "cobros recuperados exitosamente" });
    } catch (e) {

        return res.status(400).json({ status: 400, message: e.message });
    }
}
