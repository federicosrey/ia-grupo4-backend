var User = require('../models/User.model');
var Tarjeta = require('../models/Tarjeta.model');
var Movimiento = require('../models/Movimiento.model');
var Liquidacion = require('../models/Liquidacion.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const Liquidaciones = require('../models/Liquidacion.model');

_this = this



//Agrego movimiento
exports.agregarLiquidacion = async function (liquidacion) {    

    var nuevaLiquidacion = new Liquidacion({
        idCobro: liquidacion.idCobro,
        fecha: liquidacion.fecha,
        cuilcuitUsuario: liquidacion.cuilUsuario,
        numeroTarjeta: liquidacion.numeroTarjeta, 
        total: liquidacion.total,
    })

    try {
        var liquidacionGuardada = await nuevaLiquidacion.save();
        
        return liquidacionGuardada._id;
    } catch (e) {
        console.log(e)
        throw Error("Error creando liquidacion")
    }
}

exports.getLiquidaciones = async function (query, page, limit) {

    var options = {
        page,
        limit
    }
    try {
        //var movimientos = await Movimiento.find();
        
        var liquidaciones = await Liquidacion.paginate(query,options)

        return liquidaciones;

    } catch (e) {
        console.log("error servicio", e)
        throw Error('Error en el paginado de movimientos');
    }
}

exports.UpdateidCobroLiquidacion = async function (idLiquidacion, idCobro) {
    
    
    try {
        var liquidacion = await Liquidacion.findOne({_id: idLiquidacion}); 
       
        liquidacion.idCobro = idCobro
        var liquidacionsaved = await liquidacion.save();
        return liquidacionsaved;

    } catch (e) {
        console.log("error servicio", e)
        throw Error('Error en el paginado de movimientos');
    }
}

exports.getMontosaCobrarxConsumosClientes = async function (query, page, limit) {

    var options = {
        page,
        limit
    }
    
    try {
        var liquidaciones = await Liquidaciones.aggregate([
            {
                $match:
                {
                    idCobro:"0"
                }
            },
            {
                $group:
                {
                    _id:{cuilUsuario: "$cuilUsuario", numeroTarjeta: "$numeroTarjeta", total: "$total"},
                    mov: {$addToSet: "$_id"}
                }
            }
        ])
    
    /*try {
        var liquidacion = await Liquidacion.paginate(query,options)*/

        return liquidaciones;
    } catch (e) {
        console.log("error servicio", e)
        throw Error('Error en el paginado de movimientos');
    }
}

exports.getULiquidaciones = async function (query, page, limit) {

    var options = {
        page,
        limit
    }
    try {
        //var movimientos = await Movimiento.find();
        
        var liquidaciones = await Liquidacion.paginate(query,options)

        return liquidaciones;

    } catch (e) {
        console.log("error servicio", e)
        throw Error('Error en el paginado de movimientos');
    }
}