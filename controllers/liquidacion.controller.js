var liquidacionService = require('../services/liquidacion.service');
_this = this;

// Agrega venta del negocio
exports.postLiquidaciones = async function (req, res, next) {

     var liquidacion = {
        idCobro: 0,
        fecha: Date.now(),
        dniUsuario: req.body.dniUsuario,
        numeroTarjeta: req.body.numerotarjeta, 
        total: req.body.total,
    } 
    
     try {
        var agregandoLiquidacion = await liquidacionService.agregarLiquidacion(liquidacion)
        console.log("cont ", agregandoLiquidacion)
        return res.status(201).json({ data: agregandoLiquidacion, message: "Liquidación generada exitosamente" })
    } catch (e) {
        console.log(e)
        return res.status(400).json({ status: 400, message: "liquidacion no pudo generarse" })
    } 
}

exports.getLiquidaciones = async function (req, res, next) {

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 1000;
    
    try {
        var liquidaciones = await liquidacionService.getLiquidaciones({}, page, limit)
        return res.status(200).json({ status: 200, data: liquidaciones, message: "liquidaciones recuperadas exitosamente" });
    } catch (e) {

        return res.status(400).json({ status: 400, message: e.message });
    }
}
