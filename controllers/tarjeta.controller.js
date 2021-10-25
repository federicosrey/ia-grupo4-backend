var UserService = require('../services/user.service');
var tarjetaService = require('../services/tarjeta.service');

_this = this;

// Listo tarjetas
exports.getTarjetas = async function (req, res, next) {

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 1000;
    try {
        var Tarjetas = await tarjetaService.getTarjetas({}, page, limit)
        return res.status(200).json({ status: 200, data: Tarjetas, message: "Tarjetas recuperadas exitosamente" });
    } catch (e) {

        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getTarjeta = async function (req, res, next) {

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 1000;
    var id = req.query.descripcion;
    console.log("fe",id);
    try {
        var Tarjeta = await tarjetaService.getTarjeta(id, page, limit)
        return res.status(200).json({ status: 200, data: Tarjeta, message: "Tarjeta recuperada exitosamente" });
    } catch (e) {

        return res.status(400).json({ status: 400, message: e.message });
    }
}

// Agregar tarjeta
exports.agregarTarjeta = async function (req, res, next) {

    var tarjeta = {
        descripcion: req.body.descripcion,
        limite: req.body.limite,
    }
    try {
        var agregandoTarjeta = await tarjetaService.agregarTarjeta(tarjeta)
        return res.status(201).json({ agregandoTarjeta, message: "tarjeta generada exitosamente" })
    } catch (e) {
        console.log(e)
        return res.status(400).json({ status: 400, message: "Tarjeta no pudo generarse" })
    }
}

// Actualizacion de usuarios
exports.updateUser = async function (req, res, next) {

    if (!req.body.cuilcuit) {
        return res.status(400).json({ status: 400., message: "cuilcuit debe estar presente" })
    }
    var User = {

        name: req.body.name ? req.body.name : null,
        lastname: req.body.lastname ? req.body.lastname : null,
        email: req.body.email ? req.body.email : null,
        cuilcuit: req.body.cuilcuit ? req.body.cuilcuit : null,
        password: req.body.password ? req.body.password : null,
        root: req.body.root ? req.body.root : "N",
        nrotarjeta: req.body.nrotarjeta ? req.body.nrotarjeta : null
    }
    try {
        var updatedUser = await UserService.updateUser(User)
        return res.status(200).json({ status: 200, data: updatedUser, message: "Usuario actualizado exitosamente" })
    } catch (e) {
        return res.status(400).json({ status: 400., message: e.message })
    }
}

// Eliminar usuarios
exports.removeUser = async function (req, res, next) {

    var id = req.body.id;
    try {
        var deleted = await UserService.deleteUser(id);
        return res.status(200).send("Usuario eliminado exitosamente");
    } catch (e) {
        console.log(e)
        return res.status(400).json({ status: 400, message: e.message })
    }
}

// Login usuarios
exports.loginUser = async function (req, res, next) {

    var User = {
        email: req.body.email,
        password: req.body.password
    }
    try {

        var loginUser = await UserService.loginUser(User);
        return res.status(201).json({ loginUser, message: "login exitoso" })
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Usuario/Contraseña invalido" })
    }
}