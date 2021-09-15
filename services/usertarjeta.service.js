var User = require('../models/User.model');
var usertarjeta = require('../models/UserTarjeta.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

_this = this

// Asigno tarjeta
exports.asignarTarjeta = async function (userTarjeta) {

    var DNI = userTarjeta.dni

    try {
        const usuario =  await User.findOne({dni:DNI});
        //const tarjetas = usuario.tarjetas;
        //console.log("es array ",tarjetas);
        //usuario = await User.find({dni: DNI});

        usuario.tarjetas.push({
            idTipoTarjeta: 3,
            numero: '777',
            fechaVencimiento: Date.now(),
            fechaCierre: Date.now()+30
        })
        

        /* var usuario.tarjetas = [{
            idTipoTarjeta: 1,
            numero: "777",
            fechaVencimiento: Date.now(),
            fechaCierre: Date.now()+30
        }]*/
        
        
        var asignartarjeta = await usuario.save(); 
        
        console.log(asignartarjeta)
        return asignartarjeta;
        
    } catch (e) {
        throw Error("Error al encontrar al usuario")
    }
    /* if (!usuario) {
        return false;
    } */
    
    
}
