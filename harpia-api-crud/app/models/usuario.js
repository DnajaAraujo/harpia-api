const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UsuarioSchema = new Schema({
    nome: String,
    dataNascimento: String,
    telefone: String,
    
    email: String,
    senha: String,

    bairro: String,
    cidade: String,
    estado: String

})

export const Usuario = mongoose.model('Usuario', UsuarioSchema)
