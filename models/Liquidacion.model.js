var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')



var LiquidacionSchema = new mongoose.Schema({
    idLiquidacion: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Number
    },
    idCobro: String,
    fecha: String,
    cuilcuitUsuario: String,
    numeroTarjeta: Number, 
    total: Number,
})

LiquidacionSchema.plugin(mongoosePaginate)
const Liquidaciones = mongoose.model('Liquidaciones', LiquidacionSchema)

module.exports = Liquidaciones;