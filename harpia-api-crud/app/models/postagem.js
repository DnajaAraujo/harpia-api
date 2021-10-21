const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostagemSchema = new Schema({
    titulo: String,
    descricao: String,
    categoria: String,
    imagem: String,
    idLivro: String
})

module.exports = mongoose.model('Postagem', PostagemSchema)
