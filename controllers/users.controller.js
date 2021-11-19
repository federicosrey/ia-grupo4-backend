var UserService = require('../services/user.service');

_this = this;

// Traigo usuarios
exports.getUsers = async function (req, res, next) {

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 1000;
    try {
        var Users = await UserService.getUsers({}, page, limit)
        return res.status(200).json({ status: 200, data: Users, message: "Usuarios recuperados exitosamente" });
    } catch (e) {

        return res.status(400).json({ status: 400, message: e.message });
    }
}

// Creacion de usuarios
exports.createUser = async function (req, res, next) {

    var User = {
        name: req.body.name,
        email: req.body.email,
        //password: req.body.password,
        lastname: req.body.lastname,
        cuilcuit: req.body.cuilcuit,
        root: req.body.root,
        nrotarjeta: req.body.nrotarjeta,
        dni: req.body.dni
    }
    try {
        var createdUser = await UserService.createUser(User)
        return res.status(201).json({ createdUser, message: "Usuario generado existosamente" })
    } catch (e) {
        console.log(e)
        return res.status(400).json({ status: 400, message: "Usuario no puedo generarse" })
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
        root: req.body.root ? req.body.root : null,
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

exports.getInfoUsuario = async function (req, res, next) {

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 1000;
    
    var filtro = {

        cuilcuit: req.body.cuilUsuario,
    
      };


    try {
        var liquidaciones = await UserService.getInfoUsuario(filtro, page, limit)
        if (liquidaciones.cuilcuit === "0")

        return res.status(201).json({
  
          status: 201,
  
          data: liquidaciones,
  
          message: "No existe la empresa por ID",
  
        });
  
      else
  
        return res.status(200).json({
  
          status: 200,
  
          data: liquidaciones,
  
          message: "Empresa por ID recuperada exitosamente",
  
        });
  
    } catch (e) {
  
      console.log(e);
  
      return res.status(400).json({ status: 400, message: e.message });
  
    }
        
}

//devuelve las tarjetas de los usuarios que cierran hoy
exports.getUserTarjetaFechaCierre = async function (req, res, next) {

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 1000;
    
    try {
        var movimientos = await movimientoService.getMovimientos(Date.now(), page, limit)
        return res.status(200).json({ status: 200, data: movimientos, message: "movimientos recuperados exitosamente" });
    } catch (e) {

        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.updateTarjetaLiquidacion = async function (req, res, next) {
   
    var usuario = {
        cuilUsuario: req.body.cuilUsuario,
        numeroTarjeta: req.body.numerotarjeta,
    }
    
        var actualizandoInfo = await UserService.updateTarjetaLiquidacion(usuario)
        
        if(actualizandoInfo.status==201){
          return res.status(201).json({ data: actualizandoInfo.data, status:actualizandoInfo.status, message: actualizandoInfo.message })
        }else{
          return res.status(400).json({ data: actualizandoInfo.data, status:actualizandoInfo.status, message: actualizandoInfo.message })
        }  
    
}

exports.updatePass = async function (req, res, next) {
   
    var dni = req.body.dni;
    var pass = req.body.pass;
        
    
        var actualizandoInfo = await UserService.updatePass(dni,pass)
        
        if(actualizandoInfo===true){
          return res.status(201).json({ status:201, message: "Contraseña modificada exitosamente." })
        }else{
            return res.status(400).json({ status:400, message: "Ha ocurrido un error." })
        }  
    
}