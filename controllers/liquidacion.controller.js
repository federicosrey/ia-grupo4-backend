var liquidacionService = require('../services/liquidacion.service');
_this = this;
var moment = require('moment');

// Agrega venta del negocio
exports.postLiquidaciones = async function (req, res, next) {

     var liquidacion = {
        idCobro: 0,
        fecha: moment().format('YYYY-MM-DD'),
        cuilUsuario: req.body.cuilUsuario,
        numeroTarjeta: req.body.numerotarjeta, 
        total: req.body.total,
    } 
    
     try {
        var agregandoLiquidacion = await liquidacionService.agregarLiquidacion(liquidacion)
        console.log("cont ", agregandoLiquidacion)
        return res.status(201).json({ data: agregandoLiquidacion,status:201, message: "Liquidación generada exitosamente" })
    } catch (e) {
        console.log(e)
        return res.status(400).json({ status: 400, message: "liquidacion no pudo generarse" })
    } 
}

exports.getLiquidaciones = async function (req, res, next) {

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 1000;

    if(req.body.cuilUsuario){
      var filtro = {

        cuilcuitUsuario: req.body.cuilUsuario,
        idCobro:0
    
      };

    }else{
      var filtro = {

        idCobro:0
    
      };
    }

    
    
    


    try {
        var liquidaciones = await liquidacionService.getLiquidaciones(filtro, page, limit)
        if (liquidaciones.total === 0)

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



exports.UpdateidCobroLiquidacion = async function (req, res, next) {

    var 
    idLiquidacion = req.body.idLiquidacion;
    var idCobro = req.body.idCobro;
    
    try {
        var agregandoMovimiento = await liquidacionService.UpdateidCobroLiquidacion(idLiquidacion,idCobro)
        return res.status(201).json({ agregandoMovimiento, message: "movimiento generado exitosamente" })
    } catch (e) {
        console.log(e)
        return res.status(400).json({ status: 400, message: "movimiento no pudo generarse" })
    }
}

exports.getMontosaCobrarxConsumosClientes = async function (req, res, next) {

  var page = req.query.page ? req.query.page : 1
  var limit = req.query.limit ? req.query.limit : 1000;
    
try {
  var liquidaciones = await liquidacionService.getMontosaCobrarxConsumosClientes({}, page, limit)
  return res.status(200).json({ status: 200, data: liquidaciones, message: "Liquidaciones recuperadas exitosamente" });
} catch (e) {

  return res.status(400).json({ status: 400, message: e.message });
}
}

exports.getULiquidaciones = async function (req, res, next) {

  var page = req.query.page ? req.query.page : 1
  var limit = req.query.limit ? req.query.limit : 1000;
  
  var filtro = {

    cuilcuitUsuario: req.body.cuilUsuario,
      
  };


  try {
      var liquidaciones = await liquidacionService.getULiquidaciones(filtro, page, limit)
      if (liquidaciones.cuilUsuario === 0)

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
