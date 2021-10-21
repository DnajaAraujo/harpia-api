const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LivroSchema = new Schema({
    titulo: String,
    sinopse: String,
    autor: String,
    idade: String,
    qualidade: String
})

module.exports = mongoose.model('Livro', LivroSchema)
