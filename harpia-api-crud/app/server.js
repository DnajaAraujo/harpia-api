require("dotenv").config();

import {routerPost} from './routes/postRoute';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';

const app = express();

const configuracao = require('../config')
mongoose.connect(configuracao.db)


app.use(cors())
app.use(express.json({ limit: '50mb'}))
app.use(express.urlencoded({ extended: true }))
//app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// Salva imagem no diretório local
//app.use(configuracao.path, express.static(__dirname + '../public/upload'))
app.use(configuracao.path, express.static(path.resolve(__dirname,'..','public','upload')))

const router = express.Router()

// Middleware
router.use((req, res, next) => {
    console.log('...')
    next()
})



/*

// ----------------------------------------------------------------------------------------
// Rotas das postagens
// Obter todas as postagens
router.get('/postagens', async(req, res) => {
    Postagem.find((error, postagens) => {
        if (error) {
            res.status(400).json({ mensagem: 'Erro ao tentar obter todos as postagens' })
        }
        res.status(200).json(postagens)
    })
})


// Obter uma postagem
router.get('/postagens/:id', async(req, res) => {
    const { id } = req.params
    Postagem.findById(id, (error, postagem) => {
        if (error) {
            res.status(400).json({ mensagem: 'Id da postagem não encontrado' })
        }
        res.status(200).json(postagem)
    })
})


// Criar postagem
router.post('/postagens/criar', async(req, res) => {
    const postagem = new Postagem()

    postagem.titulo = req.body.titulo
    postagem.descricao = req.body.descricao
    postagem.categoria = req.body.categoria
    postagem.idLivro = req.body.idLivro
  
    postagem.save((error) => {
        if (error) {
            res.status(400).json({ mensagem: 'Erro ao tentar salvar a postagem' })
        }
        res.status(200).json({ mensagem: 'Postagem cadastrada com sucesso!' })
    })
})


// Alterar postagem
router.put('/postagens/alterar/:id', async(req, res) => {
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
router.delete('/postagens/deletar/:id', async(req, res) => {
    const { id } = req.params

    Postagem.deleteOne({_id: id}, (error) => {
        if (error) {
            res.status(400).json({ mensagem: 'Id da postagem não foi encontrado' })
        }
        res.status(200).json({ mensagem: 'Postagem excluida com sucesso!' })
    })
})
*/



// Padronizando rotas (ex.: .../api/postagens)
//app.use('/api', router)

app.use('/postagem',routerPost);

// Inicializando servidor
app.listen(configuracao.porta, () => {
    console.log(`App running *${configuracao.porta}...`)
})
