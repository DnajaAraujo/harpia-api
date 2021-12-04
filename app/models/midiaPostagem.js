import mongoose from 'mongoose';
const { Schema } = mongoose;

const MidiaPostagemSchema = new Schema({
    nome: String,
    tamanho: Number,
    key: String,
    url: String,
    postagemId: String,
    dataCriacao: {
        type: Date,
        default: Date.now
    },
    
    
})

export const MidiaPostagem = mongoose.model('MidiaPostagem', MidiaPostagemSchema)
