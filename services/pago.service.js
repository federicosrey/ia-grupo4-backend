var User = require('../models/User.model');
var Tarjeta = require('../models/Tarjeta.model');
var Movimiento = require('../models/Movimiento.model');
var Liquidacion = require('../models/Liquidacion.model');
var Pago = require('../models/Pago.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

_this = this


//Agrego movimiento
exports.agregarPago = async function (pago) {    

    var nuevoPago = new Pago({
        fecha: pago.fecha,
        cuitNegocio: pago.cuitNegocio, 
        total: pago.total,
        idCobro: pago.idCobro
    })

    try {
        var pagoGuardado = await nuevoPago.save();
        
        return pagoGuardado._id;
    } catch (e) {
        console.log(e)
        throw Error("Error creando pago")
    }
}

exports.getPagos = async function (query, page, limit) {

    var options = {
        page,
        limit
    }
    try {
        
        var pagos = await Pago.paginate(query,options)
        return pagos;

    } catch (e) {
        console.log("error servicio", e)
        throw Error('Error en el paginado de pagos');
    }
}

exports.UpdateidCobroPago = async function (idPago, idCobro) {
    
    
    try {
        var pago = await Pago.findOne({_id: idPago}); 
       
        pago.idCobro = idCobro
        var pagosaved = await pago.save();
        return pagosaved;

    } catch (e) {
        console.log("error servicio", e)
        throw Error('Error en el paginado de pagos');
    }
}
exports.getNPagos = async function (query, page, limit) {

    var options = {
        page,
        limit
    }
    try {
        //var movimientos = await Movimiento.find();
        
        var pagos = await Pago.paginate(query,options)

        return pagos;

    } catch (e) {
        console.log("error servicio", e)
        throw Error('Error en el paginado de movimientos');
    }
}


