var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')



var MovimientoSchema = new mongoose.Schema({
    idMovimiento: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Number
    },
    fecha: Date,
    dniUsuario: Number,
    dniNegocio: Number,
    numeroTarjeta: Number, 
    monto: Number,
    idLiquidacion: Number,
    idPago: Number,
})

MovimientoSchema.plugin(mongoosePaginate)
const Movimientos = mongoose.model('Movimientos', MovimientoSchema)

module.exports = Movimientos;