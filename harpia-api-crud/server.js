const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Postagem = require('./app/models/postagem')
const Livro = require('./app/models/livro')
const configuracao = require('./config')

mongoose.connect(configuracao.db)

app.use(express.json({ limit: '50mb'}))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// Salva imagem no diretório local
app.use(configuracao.path, express.static(__dirname + '/public/upload'))

const router = express.Router()

// Middleware
router.use((req, res, next) => {
    console.log('...')
    next()
})


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


// --------------------------------------------------------------------------------------
// Rotas dos livros
// Obter todas os livros
router.get('/livros', async(req, res) => {
    Livro.find((error, livros) => {
        if (error) {
            res.status(400).json({ mensagem: 'Erro ao tentar obter todos os livros' })
        }
        res.status(200).json(livros)
    })
})


// Obter um livro
router.get('/livros/:id', async(req, res) => {
    const { id } = req.params
    Livro.findById(id, (error, livro) => {
        if (error) {
            res.status(400).json({ mensagem: 'Id do livro não encontrado' })
        }
        res.status(200).json(livro)
    })
})


// Criar livro
router.post('/livros/criar', async(req, res) => {
    const livro = new Livro()

    livro.titulo = req.body.titulo
    livro.sinopse = req.body.sinopse
    livro.autor = req.body.autor
    livro.idade = req.body.idade
    livro.qualidade = req.body.qualidade

    livro.save((error) => {
        if (error) {
            res.status(400).json({ mensagem: 'Erro ao tentar salvar o livro' })
        }
        res.status(200).json({ mensagem: 'Livro cadastrado com sucesso!' })
    })
})


// Alterar livro
router.put('/livros/alterar/:id', async(req, res) => {
    const { id } = req.params
    const { titulo, sinopse, autor, idade, qualidade } = req.body

    Livro.findById(id, (error, livro) => {
        if (error) {
            res.status(400).json({ mensagem: 'Id do livro não encontrado' })
        }
        if (titulo) livro.titulo = titulo
        if (sinopse) livro.sinopse = sinopse
        if (autor) livro.autor = autor
        if (idade) livro.idade = idade
        if (qualidade) livro.qualidade = qualidade
        
        livro.save((error) => {
            if (error) {
                res.status(400).json({ mensagem: 'Erro ao alterar o livro' })
            }
            res.status(200).json({ mensagem: 'Livro atualizado com sucesso!' })
        })
    })

})


// Deletar livro
router.delete('/livros/deletar/:id', async(req, res) => {
    const { id } = req.params

    Livro.deleteOne({_id: id}, (error) => {
        if (error) {
            res.status(400).json({ mensagem: 'Id do livro não foi encontrado' })
        }
        res.status(200).json({ mensagem: 'Livro excluido com sucesso!' })
    })
})






// Padronizando rotas (ex.: .../api/postagens)
app.use('/api', router)

// Inicializando servidor
app.listen(configuracao.porta, () => {
    console.log(`App running *${configuracao.porta}...`)
})
