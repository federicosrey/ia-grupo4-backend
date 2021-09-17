var User = require('../models/User.model');
var Tarjeta = require('../models/Tarjeta.model');
var Movimiento = require('../models/Movimiento.model');
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
exports.agregarMovimiento = async function (movimiento) {    

    var nuevoMovimiento = new Movimiento({
        fecha: Date.now(),
        dniUsuario: movimiento.dniUsuario,
        dniNegocio: movimiento.dniNegocio,
        numeroTarjeta: movimiento.numeroTarjeta, 
        monto: movimiento.monto,
        idLiquidacion: 0,
        idPago: 0,
    })

    try {
        var movimientoGuardado = await nuevoMovimiento.save();
        var token = jwt.sign({
            id: movimientoGuardado._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        console.log(e)
        throw Error("Error creando movimiento")
    }
}

exports.getMovimientos = async function (query, page, limit) {

    var options = {
        page,
        limit
    }
    try {
        var movimientos = await Movimiento.find();
        return movimientos;

    } catch (e) {
        console.log("error servicio", e)
        throw Error('Error en el paginado de movimientos');
    }
}


