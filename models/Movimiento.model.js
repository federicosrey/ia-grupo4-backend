var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')



var MovimientoSchema = new mongoose.Schema({
    idMovimiento: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Number
    },
    fecha: String,
    cuilUsuario: String,
    cuitNegocio: String,
    numeroTarjeta: String, 
    monto: Number,
    idLiquidacion: String,
    idPago: String,
    fechaCierre: String,
    fechaVencimiento: String
})

MovimientoSchema.plugin(mongoosePaginate)
const Movimientos = mongoose.model('Movimientos', MovimientoSchema)

module.exports = Movimientos;
