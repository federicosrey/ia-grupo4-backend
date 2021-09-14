var UserService = require('../services/user.service');
var usertarjetaService = require('../services/usertarjeta.service');

_this = this;

// Listo tarjetas
exports.getUserTarjetas = async function (req, res, next) {

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 1000;
    try {
        var UserTarjetas = await usertarjetaService.getUserTarjetas({}, page, limit)
        return res.status(200).json({ status: 200, data: UserTarjetas, message: "Tarjetas de usuario recuperadas exitosamente" });
    } catch (e) {

        return res.status(400).json({ status: 400, message: e.message });
    }
}

// Agregar tarjeta
exports.postUserTarjeta = async function (req, res, next) {

    var usertarjeta = {
        idUsuario: req.body.idUsuario,
        idTarjeta: req.body.idTarjeta,
    }
    try {
        var agregandoUserTarjeta = await usertarjetaService.postUserTarjeta(usertarjeta)
        return res.status(201).json({ agregandoUserTarjeta, message: "user tarjeta generada exitosamente" })
    } catch (e) {
        console.log(e)
        return res.status(400).json({ status: 400, message: "user Tarjeta no pudo generarse" })
    }
}

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