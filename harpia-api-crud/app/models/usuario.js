const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UsuarioSchema = new Schema({
    nome: String,
    dataNascimento: String,
    endereco: String,
    telefone: String,
    email: String
})

module.exports = mongoose.model('Usuario', UsuarioSchema)
