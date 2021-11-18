var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var CobroSchema = new mongoose.Schema({
    idCobro: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Number
    },
    fecha: String,
    cuilcuitUsuario: Number, 
    total: Number
})

CobroSchema.plugin(mongoosePaginate)
const Cobros = mongoose.model('Cobros', CobroSchema)

module.exports = Cobros;