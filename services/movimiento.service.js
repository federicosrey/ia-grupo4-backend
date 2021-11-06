var User = require('../models/User.model');
var Tarjeta = require('../models/Tarjeta.model');
var Movimiento = require('../models/Movimiento.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { getUsers } = require('./user.service');
var moment = require('moment');

_this = this


//Agrego movimiento
exports.agregarMovimiento = async function (movimiento) {    
    
    var nuevoMovimiento = {
        data: "",
        status:400,
        message: ""
    }

    console.log(movimiento.cuilUsuario);
 
    //try {
       
        if(movimiento.cuilUsuario.length==11){
            var usuario = await User.findOne({cuilcuit:movimiento.cuilUsuario});
        }else{
            var usuario = await User.findOne({dni:movimiento.cuilUsuario});
        }
  
        var negocio = await User.findOne({cuilcuit:movimiento.cuitNegocio});

        if(negocio != null){
            if(usuario != null){
                if(movimiento.monto>0){
                    var nt = 0;
                    var cs = 0;
                    var li = 0;
                    for (const t of usuario.tarjetas) {
                        
                        if (t.numero == movimiento.numeroTarjeta){
                            nt = 1;
                            if(t.codigoSeguridad == movimiento.codigoSeguridad){
                                cs = 1;
                                //var acum = +movimiento.monto+t.acumulado;
                                //var acum = movimiento.monto+t.acumulado;
                                if(+movimiento.monto+t.acumulado<=t.limite){
                                    li = 1;
                                    nuevoMovimiento = new Movimiento({
                                        //fecha: moment().format('DD/MM/YYYY'),
                                        fecha: moment().format('YYYY-MM-DD'),
                                        cuilUsuario: usuario.cuilcuit,
                                        cuitNegocio: movimiento.cuitNegocio,
                                        numeroTarjeta: movimiento.numeroTarjeta, 
                                        monto: movimiento.monto,
                                        idLiquidacion: 0,
                                        idPago: 0,
                                        fechaCierre: t.fechaCierre,
                                        fechaVencimiento: t.fechaVencimiento,
                                    })  
                                    // console.log(moment().format('DD/MM/YYYY'));
                                    // console.log(moment().add(1,'months').format('DD/MM/YYYY'));
                            
                                    t.acumulado = +movimiento.monto+t.acumulado;                         
                                    await usuario.save();

                                    var movimientoGuardado = await nuevoMovimiento.save();
                                    
                                    nuevoMovimiento.data = movimientoGuardado._id;
                                    nuevoMovimiento.status = 201;
                                    nuevoMovimiento.message = "El pago se proceso correctamente";  
                                }                            
                            }
                        }
                    }
                    
                    if(nt==0){                        
                        nuevoMovimiento.data = null;
                        nuevoMovimiento.status = 400;
                        nuevoMovimiento.message = "Número de tarjeta incorrecto";                         
                    }else{
                        if(cs==0){
                            nuevoMovimiento.data = null;
                            nuevoMovimiento.status = 400;
                            nuevoMovimiento.message = "Código de seguridad incorrecto";
                        }else{
                            if(li==0){
                                nuevoMovimiento.data = null;
                                nuevoMovimiento.status = 400;
                                nuevoMovimiento.message = "El monto supera el límite disponible";
                            }
                        }
                    }
                }else{
                    nuevoMovimiento.data = null;
                    nuevoMovimiento.status = 400;
                    nuevoMovimiento.message = "El monto debe ser mayor a 0";
                }  
            }else{
                nuevoMovimiento.data = null;
                nuevoMovimiento.status = 400;
                nuevoMovimiento.message = "Cliente inexistente";
            }     
        }else{
            nuevoMovimiento.data = null;
            nuevoMovimiento.status = 400;
            nuevoMovimiento.message = "Negocio inexistente";
        }
        
             
        return nuevoMovimiento;      
        
        
        
    //} catch (e) {
    //    console.log(e)
    //    throw Error("Error al crear movimiento")
    //}
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


// exports.getMovimientos = async function (query, page, limit) {

    
//     try {
//         var movimientos = await Movimiento.aggregate([
//             {
//                 $match:
//                 {
//                     idLiquidacion:"0",
//                 }
//             },
//             {
//                 $group:
//                 {
//                     _id: { cuilUsuario: "$cuilUsuario", numeroTarjeta: "$numeroTarjeta" },  
//                     mov: {$addToSet: "$_id"},                  
//                     total: { $sum: "$monto" }
//                 }
//             }
//         ])
        
           


//         return movimientos;

//      } catch (e) {
//          console.log("error servicio", e)
//          throw Error('Error en el paginado de movimientos');
//      }
// }

exports.getMovimientos = async function (query, page, limit) {
    console.log("gola")
    var losmo = await Movimiento.find({idLiquidacion:"0"});

    console.log("losmo ",losmo);

    var movimientos = new Array();

   



    

    var encontro=0;

    console.log(movimientos);
    for (const lm of losmo){    
        for (const m of movimientos){
            if(m.cuilUsuario==lm.cuilUsuario){
                if(m.numeroTarjeta==lm.numeroTarjeta){
                    if(moment(lm.fecha).isSameOrBefore(lm.fechaCierre)){
                        encontro=1;
                        m.total +=lm.monto;
                        m.mov.push(lm._id.toString());
                    }    
                }    
            }
        }
        if(encontro==0){
            if(moment(lm.fecha).isSameOrBefore(lm.fechaCierre)){
                movimientos.push(
                    { 
                        cuilUsuario: lm.cuilUsuario,
                        numeroTarjeta: lm.numeroTarjeta,
                        mov: [lm._id.toString()],
                        total: lm.monto,
                        fechaVencimiento: lm.fechaVencimiento
                    }
                );
            }            
        }
        encontro=0;
    }    
    

  
        
           

    console.log(movimientos);
    return movimientos;

     
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
