import mongoose from 'mongoose';
const { Schema } = mongoose;

const MidiaPerfilSchema = new Schema({
    nome: String,
    tamanho: Number,
    key: String,
    url: String,
    usuarioId: String,
    dataCriacao: {
        type: Date,
        default: Date.now
    },
    
    

})

export const MidiaPerfil = mongoose.model('MidiaPerfil', MidiaPerfilSchema)
