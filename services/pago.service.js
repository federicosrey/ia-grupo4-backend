var User = require('../models/User.model');
var Tarjeta = require('../models/Tarjeta.model');
var Movimiento = require('../models/Movimiento.model');
var Liquidacion = require('../models/Liquidacion.model');
var Pago = require('../models/Pago.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

_this = this

// Asigno tarjeta
exports.asignarTarjeta = async function (userTarjeta) {

    var DNI = userTarjeta.dni
    var tarjeta = userTarjeta.tarjeta

    try {
        const usuario =  await User.findOne({dni:DNI});
        //const tarjetas = usuario.tarjetas;
        //console.log("es array ",tarjetas);
        //usuario = await User.find({dni: DNI});
        const t = await Tarjeta.findOne({descripcion:tarjeta});

        usuario.tarjetas.push({
            descripcion: t.descripcion,
            limite: t.limite,
            numero: '6321 4456 '.concat(' ',usuario.dni),
            fechaVencimiento: Date.now(),
            fechaCierre: Date.now()
        })
        

        /* var usuario.tarjetas = [{
            idTipoTarjeta: 1,
            numero: "777",
            fechaVencimiento: Date.now(),
            fechaCierre: Date.now()+30
        }]*/
        
        
        var asignartarjeta = await usuario.save(); 
        
        
        return asignartarjeta;
        
    } catch (e) {
        throw Error("Error al encontrar al usuario")
    }
    /* if (!usuario) {
        return false;
    } */
    
    
}

//Agrego movimiento
exports.agregarPago = async function (pago) {    

    var nuevoPago = new Pago({
        fecha: pago.fecha,
        dniNegocio: pago.dniNegocio, 
        total: pago.total
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
        var pagos = await Pago.find();
        return pagos;

    } catch (e) {
        console.log("error servicio", e)
        throw Error('Error en el paginado de pagos');
    }
}


