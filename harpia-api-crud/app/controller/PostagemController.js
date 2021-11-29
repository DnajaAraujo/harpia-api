//import express from 'express';
import { get } from "mongoose"
import { Postagem } from "../models/Postagem"



export const PostagemController = {

    async index(request,response){
        
        // try {
        //     const postagens = await Post.find({}).exec();    
        //     response.status(200).json(postagens);
        // }catch (error) {
        //     response.status(400).json({ mensagem: error.message })
        //     console.log(error);
        // }
        

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
        
        // post.save((error) => {
        //     if (error) {
        //         response.status(400).json({ mensagem: 'Erro ao tentar salvar a post' })
        //     }
        //     response.status(200).json({ mensagem: 'Post cadastrado com sucesso!' })
        // })
    },

    async get(request, response){

        const { id } = request.params
        Postagem.findById(id, (error, postagem) => {
            if (error) {
                response.status(400).json({ mensagem: 'Id da postagem não encontrado' })
            }
            response.status(200).json(postagem)
        })
    }
}