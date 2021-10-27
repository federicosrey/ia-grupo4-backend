var User = require('../models/User.model');
var Tarjeta = require('../models/Tarjeta.model');
var Movimiento = require('../models/Movimiento.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { getUsers } = require('./user.service');

_this = this


//Agrego movimiento
exports.agregarMovimiento = async function (movimiento) {    
    
    var nuevoMovimiento = null;
     
 
    try {
        
        var usuario = await User.findOne({cuilcuit:movimiento.cuilUsuario});
        console.log("usuario ", usuario);
        var negocio = await User.findOne({cuilcuit:movimiento.cuitNegocio});
        console.log("negocio ", negocio);
        /* if(negocio != null){
            if(movimiento.monto>0){
                usuario.tarjetas.forEach(t => {
                    if (t.numero == movimiento.numeroTarjeta){
                        if(t.codigoSeguridad == movimiento.codigoSeguridad){
                            if(movimiento.monto+t.acumulado<=t.limite){
                                nuevoMovimiento = new Movimiento({
                                    fecha: Date.now(),
                                    cuilUsuario: movimiento.cuilUsuario,
                                    cuitNegocio: movimiento.cuitNegocio,
                                    numeroTarjeta: movimiento.numeroTarjeta, 
                                    monto: movimiento.monto,
                                    idLiquidacion: 0,
                                    idPago: 0,
                                })                        
                            }                            
                        }
                    }
                });
            }
            
        } */

        if(negocio != null){
            console.log("negocio no es null ");
            if(movimiento.monto>0){
                console.log("tiene monto ");
                for (const t of usuario.tarjetas) {
                    if (t.numero == movimiento.numeroTarjeta){
                        console.log("encontro tarjeta ");
                        if(t.codigoSeguridad == movimiento.codigoSeguridad){
                            console.log(" cod seg ok");
                            var acum = +movimiento.monto+t.acumulado;
                            console.log("acum ",acum);
                            console.log("t.limite ",t.limite);
                            var acum = movimiento.monto+t.acumulado;
                            console.log("la condicion ", movimiento.monto+t.acumulado<=t.limite);
                            if(+movimiento.monto+t.acumulado<=t.limite){
                                console.log(" tengo limite ");
                                nuevoMovimiento = new Movimiento({
                                    fecha: Date.now(),
                                    cuilUsuario: movimiento.cuilUsuario,
                                    cuitNegocio: movimiento.cuitNegocio,
                                    numeroTarjeta: movimiento.numeroTarjeta, 
                                    monto: movimiento.monto,
                                    idLiquidacion: 0,
                                    idPago: 0,
                                })  
                                
                                t.acumulado = +movimiento.monto+t.acumulado;                         
                                    
                                
                                await usuario.save();

                            }                            
                        }
                    }
                }
            }
            
        }
        console.log(" nuevo movimiento ", nuevoMovimiento);
             
        var movimientoGuardado = await nuevoMovimiento.save();
                
        return movimientoGuardado;        
        
        
        
    } catch (e) {
        console.log(e)
        throw Error("Error al crear movimiento")
    }
}

exports.getMovimientosUsuario = async function (query, page, limit) {

    var options = {
        page,
        limit
    }
    try {
        var movimientos = await Movimiento.find();           
        return movimientos;

    } catch (e) {
        console.log("error servicio", e)
        throw Error('Error en el paginado de movimientos');
    }
}

exports.UpdateidLiquidacionMovimiento = async function (idmovimiento, idliquidacion) {
    console.log(idmovimiento)
    console.log(idliquidacion)
    
    try {
        var movimientos = await Movimiento.findOne({_id: idmovimiento}); 
       
        movimientos.idLiquidacion = idliquidacion
        var movimientosaved = await movimientos.save();
        return movimientos;

    } catch (e) {
        console.log("error servicio", e)
        throw Error('Error en el paginado de movimientos');
    }
}


exports.UpdateidPagoMovimiento = async function (idmovimiento, idpago) {
    
    
    try {
        var movimientos = await Movimiento.findOne({_id: idmovimiento}); 
       
        movimientos.idPago = idpago
        var movimientosaved = await movimientos.save();
        return movimientos;

    } catch (e) {
        console.log("error servicio", e)
        throw Error('Error en el paginado de movimientos');
    }
}

exports.getUMovimientos = async function (query, page, limit) {

    var options = {
        page,
        limit
    }
    try {
        //var movimientos = await Movimiento.find();
        
        var liquidaciones = await Movimiento.paginate(query,options)

        return liquidaciones;

    } catch (e) {
        console.log("error servicio", e)
        throw Error('Error en el paginado de movimientos');
    }
}


exports.getMovimientos = async function (query, page, limit) {

    var options = {
        page,
        limit
    }
    try {
        //var movimientos = await Movimiento.find();
        
        var movimientos = await Movimiento.aggregate([
            {
                $match:
                {
                   idLiquidacion:"0"
                }
            },
            {
                $group:
                {
                    _id: { cuilUsuario: "$cuilUsuario", numeroTarjeta: "$numeroTarjeta" },  
                    mov: {$addToSet: "$_id"},                  
                    total: { $sum: "$monto" }
                }
            }
        ])

        return movimientos;

    } catch (e) {
        console.log("error servicio", e)
        throw Error('Error en el paginado de movimientos');
    }
}

exports.getNMovimientos = async function (query, page, limit) {

    var options = {
        page,
        limit
    }
    try {
        //var movimientos = await Movimiento.find();
        
        var liquidaciones = await Movimiento.paginate(query,options)

        return liquidaciones;

    } catch (e) {
        console.log("error servicio", e)
        throw Error('Error en el paginado de movimientos');
    }
}

exports.getMontosaPagaraEstablecimientos = async function (query, page, limit) {

    var options = {
        page,
        limit
    }
    try {
        var movimientos = await Movimiento.aggregate([
            {
                $match:
                {
                   idPago:"0"
                }
            },
            {
                $group:
                {
                    _id: { cuitNegocio: "$cuitNegocio"},  
                    mov: {$addToSet: "$_id"},                  
                    total: { $sum: "$monto" }
                }
            }
        ])

        return movimientos;

    } catch (e) {
        console.log("error servicio", e)
        throw Error('Error en el paginado de movimientos');
    }
}
/*
exports.getMontosaCobrarxConsumosClientes = async function (query, page, limit) {

    var options = {
        page,
        limit
    }
    try {
        //var movimientos = await Movimiento.find();
        
        var movimientos = await Movimiento.paginate(query,options)

        return movimientos;

    } catch (e) {
        console.log("error servicio", e)
        throw Error('Error en el paginado de movimientos');
    }
}

*/
