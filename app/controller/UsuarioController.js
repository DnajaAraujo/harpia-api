import { MidiaPerfil } from '../models/midiaPerfil'
import {Usuario} from './../models/usuario'

export const UsuarioController = {

    async getAll(request, response) {
        Usuario.find((error, usuarios) => {
            if (error) {
                response.status(400).json({ mensagem: 'Erro ao tentar obter todos os usuários!' })
            }
            response.status(200).json(usuarios)
        })
    },

    async get(request, response) {
        const { id } = request.params
        Usuario.findById(id, (error, usuario) => {
            if (error) {
                response.status(400).json({ mensagem: 'Id do usuário não encontrado!' })
            }
            response.status(200).json(usuario)
        
        })
    },

    async create(request,response){

        const { originalname, size : tamanho, key, location: url = "" } = request.file;

        const { nome, dataNascimento,  telefone, email, senha, bairro, cidade, estado } = request.body

        try{
            const usuario = await Usuario.create({
                nome,
                dataNascimento,
                telefone,
                email,
                senha,
                bairro,
                cidade,
                estado
            })

            await MidiaPerfil.create({
                nome : originalname,
                tamanho,
                key,
                url,
                usuarioId : usuario._id
            });

            response.status(200).json({ mensagem: 'Usuário cadastrado com sucesso!' })
        
        }catch{
            response.status(400).json({ mensagem: 'Erro ao tentar salvar o usuário!' })
        }
    
    },

    async update(request, response){
        const { id } = req.params
        const { 
            nome, 
            dataNascimento, 
            telefone, 
            email, 
            senha,
            bairro,
            cidade,
            estado 
        } = request.body
    
        Usuario.findById(id, (error, usuario) => {
            if (error) {
                resquest.status(400).json({ mensagem: 'Id do usuário não encontrado!' })
            }
            if (nome) usuario.nome = nome
            if (dataNascimento) usuario.dataNascimento = dataNascimento
            if (telefone) usuario.telefone = telefone
            if (email) usuario.email = email
            if (senha) usuario.senha = senha
            if (bairro) usuario.bairro = bairro
            if (cidade) usuario.cidade = cidade
            if (estado) usuario.estado = estado
            
            usuario.save((error) => {
                if (error) {
                    response.status(400).json({ mensagem: 'Erro ao alterar o usuário!' })
                }
                response.status(200).json({ mensagem: 'Usuário atualizado com sucesso!' })
            })
        })
    },

    async delete(request, response){
        const { id } = request.params

        Usuario.deleteOne({_id: id}, (error) => {
            if (error) {
                response.status(400).json({ mensagem: 'Id do usuário não foi encontrado!' })
            }
            response.status(200).json({ mensagem: 'Usuário excluido com sucesso!' })
        })
    }

}