//import express from 'express';
import { get } from "mongoose"
import { Postagem } from "../models/postagem"



export const PostagemController = {

    async index(request,response){
                
        Postagem.find((error, postagens) => {
            if (error) {
                response.status(400).json({ mensagem: 'Erro ao tentar obter todos as postagens' })
            }
            response.status(200).json(postagens)
        })
    },

    async create(request,response){

        const post = new Postagem()

        post.titulo = request.body.titulo
        post.descricao = request.body.descricao
        post.categoria = request.body.categoria
        post.idUsuario = request.body.idUsuario

        //Get file

        const { originalname: name, size, key, location: url = "" } = request.file;
        console.log(name,url)

        try {
            await post.save();    
            response.status(200).json({ mensagem: 'Post cadastrado com sucesso!' })
        } catch (error) {
            response.status(400).json({ mensagem: 'Erro ao tentar salvar a post' })
        }
        
    },

    async get(request, response){

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
        const { titulo, descricao, categoria, idLivro } = request.body

        Postagem.findById(id, (error, postagem) => {
            if (error) {
                request.status(400).json({ mensagem: 'Id da postagem não encontrado' })
            }
            if (titulo) postagem.titulo = titulo
            if (descricao) postagem.descricao = descricao
            if (categoria) postagem.categoria = categoria
            if (idLivro) postagem.idLivro = idLivro
            
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
    }
}