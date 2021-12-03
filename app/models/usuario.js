import mongoose from 'mongoose';
const { Schema } = mongoose;

const UsuarioSchema = new Schema({
    nome: String,
    dataNascimento: String,
    telefone: String,
    
    email: String,
    senha: String,

    bairro: String,
    cidade: String,
    estado: String,
    dataCadastro: {type: Date, default: Date.now}

})

export const Usuario = mongoose.model('Usuario', UsuarioSchema)
