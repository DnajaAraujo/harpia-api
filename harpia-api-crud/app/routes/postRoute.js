import {Router} from 'express';

import multer from 'multer';
import multerConfig from '../config/multer'

import {PostagemController} from '../controller/PostagemController';
import {Postagem} from '../models/Postagem';

const routerPost = Router();



// ----------------------------------------------------------------------------------------
// Rotas das postagens
// Obter todas as postagens
//routerPost.get('/getAll', async(req, res) => {
//    PostController.index(req,res);
    // Post.find((error, postagens) => {
    //     if (error) {
    //         res.status(400).json({ mensagem: 'Erro ao tentar obter todos as postagens' })
    //     }
    //     res.status(200).json(postagens)
    // })
//})


// ----------------------------------------------------------------------------------------
// Rotas das postagens
// Obter todas as postagens
routerPost.get('/getAll', PostagemController.index);


// Obter uma postagem

routerPost.get('/:id', PostagemController.get);
// routerPost.get('/:id', async(req, res) => {
//     const { id } = req.params
//     Post.findById(id, (error, postagem) => {
//         if (error) {
//             res.status(400).json({ mensagem: 'Id da postagem não encontrado' })
//         }
//         res.status(200).json(postagem)
//     })
// })


// Criar postagem
routerPost.post('/criar',multer(multerConfig).single("file") , PostagemController.create);
// routerPost.post('/criar', async(req, res) => {
//     const postagem = new Postagem()

//     postagem.titulo = req.body.titulo
//     postagem.descricao = req.body.descricao
//     postagem.categoria = req.body.categoria
//     postagem.idLivro = req.body.idLivro
  
//     postagem.save((error) => {
//         if (error) {
//             res.status(400).json({ mensagem: 'Erro ao tentar salvar a postagem' })
//         }
//         res.status(200).json({ mensagem: 'Postagem cadastrada com sucesso!' })
//     })
// })


// Alterar postagem
routerPost.put('/alterar/:id', async(req, res) => {
    const { id } = req.params
    const { titulo, descricao, categoria, idLivro } = req.body

    Postagem.findById(id, (error, postagem) => {
        if (error) {
            res.status(400).json({ mensagem: 'Id da postagem não encontrado' })
        }
        if (titulo) postagem.titulo = titulo
        if (descricao) postagem.descricao = descricao
        if (categoria) postagem.categoria = categoria
        if (idLivro) postagem.idLivro = idLivro
        
        postagem.save((error) => {
            if (error) {
                res.status(400).json({ mensagem: 'Erro ao alterar a postagem' })
            }
            res.status(200).json({ mensagem: 'Postagem atualizada com sucesso!' })
        })
    })

})


// Deletar postagem
routerPost.delete('/deletar/:id', async(req, res) => {
    const { id } = req.params

    Postagem.deleteOne({_id: id}, (error) => {
        if (error) {
            res.status(400).json({ mensagem: 'Id da postagem não foi encontrado' })
        }
        res.status(200).json({ mensagem: 'Postagem excluida com sucesso!' })
    })
})


export {routerPost};

