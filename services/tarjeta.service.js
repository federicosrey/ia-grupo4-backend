var User = require('../models/User.model');
var tarjeta = require('../models/Tarjeta.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

_this = this

// Recupero tarjetas
exports.getTarjetas = async function (query, page, limit) {

    var options = {
        page,
        limit
    }
    try {
        var Tarjetas = await tarjeta.paginate(query, options)
        return Tarjetas;

    } catch (e) {
        console.log("error servicio", e)
        throw Error('Error en el paginado de tarjetas');
    }
}

exports.getTarjeta = async function (query, page, limit) {

    var options = {
        page,
        limit
    }
    try {
        var Tarjeta = await tarjeta.find({descripcion: query});
        return Tarjeta;

    } catch (e) {
        console.log("error servicio", e)
        throw Error('Error en el paginado de tarjeta');
    }
}

// Creo tarjeta
exports.agregarTarjeta = async function (Tarjeta) {    

    var nuevaTarjeta = new tarjeta({
        descripcion: Tarjeta.descripcion,
        limite: Tarjeta.limite,
    })

    try {
        var TarjetaGuardada = await nuevaTarjeta.save();
        var token = jwt.sign({
            id: TarjetaGuardada._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        console.log(e)
        throw Error("Error while Creating User")
    }
}

// Actualizo usuarios
exports.updateUser = async function (user) {

    var ids = { cuilcuit: user.cuilcuit }

    try {
        var oldUser = await User.findOne(ids);
    } catch (e) {
        throw Error("Error al encontrar el usuarios")
    }
    if (!oldUser) {
        return false;
    }
    var hashedPassword = bcrypt.hashSync(user.password, 8);
    oldUser.name = user.name
    oldUser.lastname = user.lastname
    oldUser.email = user.email
    oldUser.cuilcuit = user.cuilcuit
    oldUser.password = hashedPassword
    oldUser.root = user.root
    oldUser.nrotarjeta = user.nrotarjeta

    try {
        var savedUser = await oldUser.save()
        return savedUser;
    } catch (e) {
        throw Error("Error al querer actualizar el usuario");
    }
}

// Deleteo usuario
exports.deleteUser = async function (id) {

    try {
        var deleted = await User.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Usuario no pudo eliminarse")
        }
        return deleted;
    } catch (e) {
        console.log(e)
        throw Error("Error al querer elimianr el usuario")
    }
}

// Login usuario
exports.loginUser = async function (user) {

    try {

        var _details = await User.findOne({
            email: user.email
        });
        var passwordIsValid = bcrypt.compareSync(user.password, _details.password);
        if (!passwordIsValid) throw Error("Usuario/Contraseña invalido")

        var token = jwt.sign({
            id: _details._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return { token: token, user: _details };
    } catch (e) {
        throw Error("Error al login de usuario")
    }

}