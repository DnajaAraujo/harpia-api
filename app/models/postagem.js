import mongoose from 'mongoose';
const { Schema } = mongoose;

const PostagemSchema = new Schema({
    titulo: String,
    descricao: String,
    categoria: String,
    localizacao: String,
    idUsuario: String,
    valor: Number,
    dataCadastro: { type: Date, default: Date.now },
    dataDevolucao: Date,
    dataRealDevolucao: Date,
    multa: Number,
    status: Boolean,
    itensInteresse: String,

    cep: String,
    uf : String,
    codigoCidade: String,
    bairro: String,
    logradouro: String,
    cidade: String

})
const Postagem = mongoose.model('Postagem', PostagemSchema);

export {Postagem}

