var User = require('../models/User.model');
var Tarjeta = require('../models/Tarjeta.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

_this = this

// Asigno tarjeta
exports.asignarTarjeta = async function (userTarjeta) {

    
    
    try {
        const usuario =  await User.findOne({_id:userTarjeta.cuilcuit});
        console.log("servicio usuario", usuario);
        const t = await Tarjeta.findOne({descripcion:userTarjeta.tarjeta});
        console.log("servicio tarjeta", t);
        await usuario.tarjetas.push({
            descripcion: t.descripcion,
            limite: t.limite,
            numero: t.prefijo.toString().concat('',usuario.dni),
            fechaVencimiento: userTarjeta.fechaVencimiento,
            fechaCierre: userTarjeta.fechaCierre,
            codigoSeguridad: userTarjeta.codigoSeguridad,
            acumulado : 0
        })
        console.log("completo info", usuario);
        var asignartarjeta = await usuario.save(); 
        console.log("guardado", asignartarjeta);
        return asignartarjeta;
        
    } catch (e) {
        throw Error("Error al asignar tarjeta")
    }
    /* if (!usuario) {
        return false;
    } */
    
    
}
