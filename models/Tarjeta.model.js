var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var TarjetaSchema = new mongoose.Schema({
    descripcion: String,
    limite: Number,
})

TarjetaSchema.plugin(mongoosePaginate)
const Tarjetas = mongoose.model('Tarjetas', TarjetaSchema)

module.exports = Tarjetas;