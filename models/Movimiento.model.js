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
    cuilUsuario: {
        type: String,
        required: [true, 'CUIL requerido'],
        minlength:[11,'El CUIL debe tener 11 caracteres']
    },
    cuitNegocio: String,
    numeroTarjeta: String, 
    monto: Number,
    idLiquidacion: String,
    idPago: String,
})

MovimientoSchema.plugin(mongoosePaginate)
const Movimientos = mongoose.model('Movimientos', MovimientoSchema)

module.exports = Movimientos;