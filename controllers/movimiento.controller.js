var UserService = require('../services/user.service');
var tarjetaService = require('../services/tarjeta.service');
var movimientoService = require('../services/movimiento.service');
_this = this;

// Agrega venta del negocio
exports.agregarMovimiento = async function (req, res, next) {
   
    var movimiento = {
        cuilUsuario: req.body.cuilUsuario,
        cuitNegocio: req.body.cuitNegocio,
        numeroTarjeta: req.body.numerotarjeta,
        codigoSeguridad: req.body.codigoseguridad,
        monto: req.body.monto
    }
    try {
        var agregandoMovimiento = await movimientoService.agregarMovimiento(movimiento)
        return res.status(201).json({ status:201, message: "Movimiento generado exitosamente" })
    } catch (e) {
        console.log(e)
        return res.status(400).json({ status: 400, message: "No pudo cargarse el movimiento. Verifique que los datos sean los correctos." })
    }
}

exports.getMovimientos = async function (req, res, next) {

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 1000;
    
    try {
        var movimientos = await movimientoService.getMovimientos({}, page, limit)
        return res.status(200).json({ status: 200, data: movimientos, message: "movimientos recuperados exitosamente" });
    } catch (e) {

        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getUMovimientos = async function (req, res, next) {

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 1000;
    
    var filtro = {

        cuilUsuario: req.body.cuilUsuario,
    
    };


    try {
        var liquidaciones = await movimientoService.getUMovimientos(filtro, page, limit)
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

exports.getNMovimientos = async function (req, res, next) {

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 1000;
    
    var filtro = {

        cuitNegocio: req.body.cuitNegocio,
    
    };


    try {
        var liquidaciones = await movimientoService.getNMovimientos(filtro, page, limit)
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

exports.UpdateidLiquidacionMovimiento = async function (req, res, next) {

    var idMovimiento = req.body.idmovimiento;
    var idLiquidacion = req.body.idliquidacion;
    
    try {
        var agregandoMovimiento = await movimientoService.UpdateidLiquidacionMovimiento(idMovimiento,idLiquidacion)
        return res.status(201).json({ agregandoMovimiento, message: "movimiento generado exitosamente" })
    } catch (e) {
        console.log(e)
        return res.status(400).json({ status: 400, message: "movimiento no pudo generarse" })
    }
}

exports.UpdateidPagoMovimiento = async function (req, res, next) {

    var idMovimiento = req.body.idmovimiento;
    var idPago = req.body.idpago;
    
    try {
        var agregandoMovimiento = await movimientoService.UpdateidPagoMovimiento(idMovimiento,idPago)
        return res.status(201).json({ agregandoMovimiento, message: "movimiento generado exitosamente" })
    } catch (e) {
        console.log(e)
        return res.status(400).json({ status: 400, message: "movimiento no pudo generarse" })
    }
}

exports.getMontosaPagaraEstablecimientos = async function (req, res, next) {
 
    
  var page = req.query.page ? req.query.page : 1
  var limit = req.query.limit ? req.query.limit : 1000;
    
try {
  var movimientos = await movimientoService.getMontosaPagaraEstablecimientos({}, page, limit)
  return res.status(200).json({ status: 200, data: movimientos, message: "Liquidaciones recuperadas exitosamente" });
} catch (e) {

  return res.status(400).json({ status: 400, message: e.message });
}
}


/*exports.getMontosaCobrarxConsumosClientes = async function (req, res, next) {
 
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 1000;
    
    var filtro = {

        cuilUsuario: req.body.cuilUsuario,
    };
    try {
        var movimientos = await movimientoService.getMontosaCobrarxConsumosClientes(filtro, page, limit)
        if (!req.body.cuilUsuario)

        return res.status(201).json({
          status: 201,
          //data: movimientos,
          message: "No existe el usuario por cuilcuit",
        });
  
      else
  
        return res.status(200).json({
          status: 200,
          data: movimientos,
          message: "Usuario por cuilcuit recuperado exitosamente",
        });
  
    } catch (e) {
      console.log(e);
      return res.status(400).json({ status: 400, message: e.message });
  
    }
}*/