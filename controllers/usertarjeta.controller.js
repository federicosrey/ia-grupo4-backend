var UserService = require('../services/user.service');
var usertarjetaService = require('../services/usertarjeta.service');

_this = this;

exports.asignarTarjeta = async function(req, res, next){
    var userTarjeta = {
        dni: req.query.dni,
    }

    console.log("siiiii ",userTarjeta)
    try {
        var asignandoTarjeta = await usertarjetaService.asignarTarjeta(userTarjeta)
        return res.status(201).json({ asignandoTarjeta, message: "user tarjeta asignada exitosamente" })
    } catch (e) {
        console.log(e)
        return res.status(400).json({ status: 400, message: "user Tarjeta no pudo asignarse" })
    }
}