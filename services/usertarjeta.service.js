var User = require('../models/User.model');
var Tarjeta = require('../models/Tarjeta.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

_this = this

// Asigno tarjeta
exports.asignarTarjeta = async function (userTarjeta) {

    
    
    try {
        const usuario =  await User.findOne({_id:userTarjeta.cuilcuit});
        //const tarjetas = usuario.tarjetas;
        //console.log("es array ",tarjetas);
        //usuario = await User.find({cuilcuit: cuilcuit});
        console.log("asignacion 1: ",usuario);
        const t = await Tarjeta.findOne({descripcion:userTarjeta.tarjeta});
        console.log("la tarjeta que encontro: ",t);

        usuario.tarjetas.push({
            descripcion: t.descripcion,
            limite: t.limite,
            numero: '63214456'.concat('',usuario.cuilcuit),
            fechaVencimiento: Date.now(),
            fechaCierre: Date.now()
        })
        

        /* var usuario.tarjetas = [{
            idTipoTarjeta: 1,
            numero: "777",
            fechaVencimiento: Date.now(),
            fechaCierre: Date.now()+30
        }]*/
        
        console.log("asignacion: ",usuario);
        var asignartarjeta = await usuario.save(); 
        
        console.log("dev ",asignartarjeta);
        return asignartarjeta;
        
    } catch (e) {
        throw Error("Error al encontrar al usuario")
    }
    /* if (!usuario) {
        return false;
    } */
    
    
}
