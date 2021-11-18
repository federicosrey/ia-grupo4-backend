var cobroService = require('../services/cobro.service');
_this = this;
var moment = require('moment');

// Agrega venta del negocio
exports.agregarCobro = async function (req, res, next) {

    var cobro = {
        fecha: moment().format('YYYY-MM-DD'),
        cuilUsuario: req.body.cuilUsuario, 
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

    var filtro = {

        idCobro:0
    
    };
    
    try {
        var cobros = await cobroService.getCobros(filtro, page, limit)
        return res.status(200).json({ status: 200, data: cobros, message: "cobros recuperados exitosamente" });
    } catch (e) {

        return res.status(400).json({ status: 400, message: e.message });
    }
}
