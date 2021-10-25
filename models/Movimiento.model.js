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
    cuilUsuario: Number,
    cuitNegocio: Number,
    numeroTarjeta: Number, 
    monto: Number,
    idLiquidacion: String,
    idPago: String,
})

MovimientoSchema.plugin(mongoosePaginate)
const Movimientos = mongoose.model('Movimientos', MovimientoSchema)

module.exports = Movimientos;