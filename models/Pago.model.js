var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var PagoSchema = new mongoose.Schema({
    idPago: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Number
    },
    fecha: Date,
    cuitNegocio: Number, 
    total: Number
})

PagoSchema.plugin(mongoosePaginate)
const Pagos = mongoose.model('Pagos', PagoSchema)

module.exports = Pagos;