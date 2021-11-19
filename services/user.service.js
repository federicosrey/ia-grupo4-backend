var User = require('../models/User.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var moment = require('moment');

_this = this

// Recupero usuarios
exports.getUsers = async function (query, page, limit) {

    var options = {
        page,
        limit
    }
    try {
        var Users = await User.paginate(query, options)
        return Users;

    } catch (e) {
        console.log("error servicio", e)
        throw Error('Error en el paginado de usuarios');
    }
}



// Creo usuarios
exports.createUser = async function (user) {
    //var hashedPassword = bcrypt.hashSync(user.password, 8);

    var newUser = new User({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        cuilcuit: user.cuilcuit,
        root: user.root,
        date:  moment().format('YYYY-MM-DD'),
        password: "0",
        nrotarjeta: user.nrotarjeta,
        dni: user.dni,

    })

    try {
        var savedUser = await newUser.save();
        var token = jwt.sign({
            id: savedUser._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        console.log(e)
        throw Error("Error while Creating User")
    }
}

exports.updatePass = async function (userdni, pass) {    
    
        var hashedPassword = bcrypt.hashSync(pass, 8);    
       
        console.log(userdni,pass);
        var user = await User.findOne({dni:userdni});
        
            console.log(user);
            if(user != null){

                if(user.password==="0"){
                    user.password = hashedPassword;
                            
                    var actualizoInfo = await user.save(); 
                    console.log(actualizoInfo)       
                    return true;            
                }
                
               
                
            }    
        return false;
        
             
              
        
        
        
 
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

        var _details = await User.findOne({email: user.email});

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

exports.getInfoUsuario = async function (query, page, limit) {

    var options = {
        page,
        limit
    }
    try {
        //var movimientos = await Movimiento.find();
        
        var liquidaciones = await User.paginate(query,options)

        return liquidaciones;

    } catch (e) {
        console.log("error servicio", e)
        throw Error('Error en el paginado de movimientos');
    }
}

exports.updateTarjetaLiquidacion = async function (usuario) {    
    
    var nuevoMovimiento = {
        data: "",
        status:400,
        message: ""
    }

       
        console.log("llego", usuario);
        var user = await User.findOne({cuilcuit:usuario.cuilUsuario});
        
        
            if(user != null){
                
                    var nt = 0;
                    
                    for (const t of user.tarjetas) {
                        
                        if (usuario.numeroTarjeta == t.numero){
                            nt = 1;
                            
                            
                            
                            console.log(t.numero);                        

                            //await user.t.push({
                                t.fechaVencimiento= moment(t.fechaVencimiento).add(1, 'M').format('YYYY-MM-DD');
                                t.fechaCierre= moment(t.fechaCierre).add(1, 'M').format('YYYY-MM-DD');
                                t.acumulado = 0;
                            //})
                            
                            var actualizoInfo = await user.save(); 
                            
                            //return actualizoInfo;
                                    
                            nuevoMovimiento.data = actualizoInfo;
                            nuevoMovimiento.status = 201;
                            nuevoMovimiento.message = "Actualizacion procesada correctamente";  
                                
                            
                        }
                    }
                    
                    if(nt==0){                        
                        nuevoMovimiento.data = null;
                        nuevoMovimiento.status = 400;
                        nuevoMovimiento.message = "Número de tarjeta incorrecto";                         
                    }
                
            }else{
                nuevoMovimiento.data = null;
                nuevoMovimiento.status = 400;
                nuevoMovimiento.message = "Cliente inexistente";
            }     
        
        
             
        return nuevoMovimiento;      
        
        
        
 
}