var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var tarjetaSchema = new mongoose.Schema({
    descripcion: String,
    limite: Number,
    numero: String,
    fechaVencimiento: Date,
    fechaCierre: Date
})

var UserSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    email: String,
    dni: String,
    password: String,
    nrotarjeta: String,
    root: String,
    date: Date,    
    tarjetas: [tarjetaSchema]
})

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('User', UserSchema)

module.exports = User;