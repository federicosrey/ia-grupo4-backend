var UserService = require('../services/user.service');
var usertarjetaService = require('../services/usertarjeta.service');

_this = this;

exports.asignarTarjeta = async function(req, res, next){
    var userTarjeta = {
        dni: req.body.dni,
        tarjeta: req.body.tarjeta
    }

    console.log("controller ",userTarjeta)
    try {
        var asignandoTarjeta = await usertarjetaService.asignarTarjeta(userTarjeta)
        return res.status(201).json({ asignandoTarjeta, message: "user tarjeta asignada exitosamente" })
    } catch (e) {
        console.log(e)
        return res.status(400).json({ status: 400, message: "user Tarjeta no pudo asignarse" })
    }
}

