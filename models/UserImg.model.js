var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var UserImgSchema = new mongoose.Schema({
    date: Date,
    dni: String,
    nombreImagen: String
    
})

UserImgSchema.plugin(mongoosePaginate)
const UserImg = mongoose.model('UsuarioImagen', UserImgSchema)

module.exports = UserImg;