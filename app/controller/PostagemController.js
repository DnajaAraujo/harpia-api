//import express from 'express';
import { get } from "mongoose"
import { MidiaPostagem } from "../models/midiaPostagem"
import { Postagem } from "../models/postagem"




export const PostagemController = {

    async index(request,response){
        
        try {
            const postagens = await Postagem.find().sort({dataCadastro: 'desc'});    
            response.status(200).json(postagens)
        } catch (error) {
            response.status(400).json({ mensagem: 'Erro ao tentar obter todos as postagens' })
        }
        
    },

    async create(request,response){

        const post = new Postagem()

        post.titulo = request.body.titulo
        post.descricao = request.body.descricao
        post.categoria = request.body.categoria
        post.idUsuario = request.body.idUsuario
        post.valor =  request.body.valor
        post.dataDevolucao =  request.body.dataDevolucao
        post.dataRealDevolucao =  request.body.dataRealDevolucao
        post.multa =  request.body.multa
        post.status =  request.body.status
        post.itensInteresse =  request.body.itensInteresse
        post.cep =  request.body.cep
        post.codigoCidade =  request.body.codigoCidade
        post.uf =  request.body.uf
        post.bairro =  request.body.bairro
        post.logradouro =  request.body.logradouro
        post.cidade =  request.body.cidade

        //Get file
              

        try {
            await post.save();    
            
            const { originalname: nome, size : tamanho, key, location: url = "" } = request.file;

            await MidiaPostagem.create({
                nome,
                tamanho,
                key,
                url,
                postagemId : post._id
            });

            response.status(200).json({ mensagem: 'Post cadastrado com sucesso!' })
        } catch (error) {
            console.log(error)
            response.status(400).json({ mensagem: 'Erro ao tentar salvar a post' })
        }
        
    },

    async getPostagem(request, response){

        const { id } = request.params
        Postagem.findById(id, (error, postagem) => {
            if (error) {
                response.status(400).json({ mensagem: 'Id da postagem não encontrado' })
            }
            response.status(200).json(postagem)
        })
    },

    async update(request, response){

        const { id } = request.params
        const { titulo, descricao, categoria, status } = request.body

        Postagem.findById(id, (error, postagem) => {
            if (error) {
                request.status(400).json({ mensagem: 'Id da postagem não encontrado' })
            }
            if (titulo) postagem.titulo = titulo
            if (descricao) postagem.descricao = descricao
            if (categoria) postagem.categoria = categoria
            if (status) postagem.status = status
            
            postagem.save((error) => {
                if (error) {
                    response.status(400).json({ mensagem: 'Erro ao alterar a postagem' })
                }
                response.status(200).json({ mensagem: 'Postagem atualizada com sucesso!' })
            })
        })
    },

    async delete(request, response){

        const { id } = request.params

        Postagem.deleteOne({_id: id}, (error) => {
            if (error) {
                response.status(400).json({ mensagem: 'Id da postagem não foi encontrado' })
            }
            response.status(200).json({ mensagem: 'Postagem excluida com sucesso!' })
        })
    },

    async getImg(request, response){

        MidiaPostagem.find((error, postagem) => {
            if (error) {
                response.status(400).json({ mensagem: 'Imagens não encontradas' })
            }
            response.status(200).json(postagem)
        })
    },

    async getImagePost(request, response){

        const {id} = request.params

        MidiaPostagem.find({postagemId: id}, (error, imagem) => {
            if (error) {
                response.status(400).json({ mensagem: 'Imagem não encontrada' })
            }
            response.status(200).json(imagem)
        })
    }
}