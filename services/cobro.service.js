var User = require('../models/User.model');
var Tarjeta = require('../models/Tarjeta.model');
var Movimiento = require('../models/Movimiento.model');
var Liquidacion = require('../models/Liquidacion.model');
var Cobro = require('../models/Cobro.model');
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
exports.agregarCobro = async function (cobro) {    

    var nuevoCobro = new Cobro({
        fecha: cobro.fecha,
        dniUsuario: cobro.dniUsuario, 
        total: cobro.total
    })

    try {
        var cobroGuardado = await nuevoCobro.save();
        
        return cobroGuardado._id;
    } catch (e) {
        console.log(e)
        throw Error("Error creando cobro")
    }
}

exports.getCobros = async function (query, page, limit) {

    var options = {
        page,
        limit
    }
    try {
        var cobros = await Cobro.find();
        return cobros;

    } catch (e) {
        console.log("error servicio", e)
        throw Error('Error en el paginado de cobros');
    }
}


