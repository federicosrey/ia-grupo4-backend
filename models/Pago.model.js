var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var PagoSchema = new mongoose.Schema({
    idPago: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Number
    },
    fecha: String,
    cuitNegocio: Number, 
    total: Number,
    idCobro: String,
})

PagoSchema.plugin(mongoosePaginate)
const Pagos = mongoose.model('Pagos', PagoSchema)

module.exports = Pagos;