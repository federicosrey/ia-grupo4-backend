var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var UserTarjetaSchema = new mongoose.Schema({
    idUsuario: String,
    idTarjeta: String,

})

UserTarjetaSchema.plugin(mongoosePaginate)
const UsersTarjetas = mongoose.model('UsersTarjetas', UserTarjetaSchema)

module.exports = UsersTarjetas;