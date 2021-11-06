var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var tarjetaSchema = new mongoose.Schema({
    descripcion: String,
    limite: Number,
    numero: String,
    fechaVencimiento: String,
    fechaCierre: String,
    codigoSeguridad: Number, 
    acumulado: Number
})

var UserSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    email: String,
    cuilcuit: String,
    password: String,
    nrotarjeta: String,
    root: String,
    date: String,    
    tarjetas: [tarjetaSchema],
    dni: String
})

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('User', UserSchema)

module.exports = User;