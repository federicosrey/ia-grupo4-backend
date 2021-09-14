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

// Actualizacion de usuarios
exports.updateUser = async function (req, res, next) {

    if (!req.body.dni) {
        return res.status(400).json({ status: 400., message: "DNI debe estar presente" })
    }
    var User = {

        name: req.body.name ? req.body.name : null,
        lastname: req.body.lastname ? req.body.lastname : null,
        email: req.body.email ? req.body.email : null,
        dni: req.body.dni ? req.body.dni : null,
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