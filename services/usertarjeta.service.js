var User = require('../models/User.model');
var Tarjeta = require('../models/Tarjeta.model');
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
        console.log("asignacion 1: ",usuario);
        const t = await Tarjeta.findOne({descripcion:tarjeta});
        
        usuario.tarjetas.push({
            descripcion: t.descripcion,
            limite: t.limite,
            numero: '6321 4456 '.concat(' ',usuario.dni),
            fechaVencimiento: Date.now(),
            fechaCierre: f
        })
        console.log("asignacion 2: ",usuario);

        /* var usuario.tarjetas = [{
            idTipoTarjeta: 1,
            numero: "777",
            fechaVencimiento: Date.now(),
            fechaCierre: Date.now()+30
        }]*/
        
        console.log("asignacion: ",usuario);
        var asignartarjeta = await usuario.save(); 
        
        
        return asignartarjeta;
        
    } catch (e) {
        throw Error("Error al encontrar al usuario")
    }
    /* if (!usuario) {
        return false;
    } */
    
    
}
