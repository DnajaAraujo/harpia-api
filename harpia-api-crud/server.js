const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Postagem = require('./app/models/postagem')
const Usuario = require('./app/models/usuario')
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
            res.status(400).json({ mensagem: 'Erro ao tentar obter todos as postagens!' })
        }
        res.status(200).json(postagens)
    })
})


// Obter uma postagem
router.get('/postagens/:id', async(req, res) => {
    const { id } = req.params
    Postagem.findById(id, (error, postagem) => {
        if (error) {
            res.status(400).json({ mensagem: 'Id da postagem não encontrado!' })
        }
        res.status(200).json(postagem)
    })
})


// Criar postagem
router.post('/postagens/criar', async(req, res) => {
    const { 
        titulo, 
        descricao, 
        categoria, 
        localizacao, 
        idUsuario 
    } = req.body
    
    const postagem = new Postagem()

    postagem.titulo = titulo
    postagem.descricao = descricao
    postagem.categoria = categoria
    postagem.localizacao = localizacao
    postagem.idUsuario = idUsuario
  
    postagem.save((error) => {
        if (error) {
            res.status(400).json({ mensagem: 'Erro ao tentar salvar a postagem!' })
        }
        res.status(200).json({ mensagem: 'Postagem cadastrada com sucesso!' })
    })
})


// Alterar postagem
router.put('/postagens/alterar/:id', async(req, res) => {
    const { id } = req.params
    const { 
        titulo, 
        descricao, 
        categoria, 
        localizacao, 
        idUsuario 
    } = req.body

    Postagem.findById(id, (error, postagem) => {
        if (error) {
            res.status(400).json({ mensagem: 'Id da postagem não encontrado!' })
        }
        if (titulo) postagem.titulo = titulo
        if (descricao) postagem.descricao = descricao
        if (categoria) postagem.categoria = categoria
        if (localizacao) postagem.localizacao = localizacao
        if (idUsuario) postagem.idUsuario = idUsuario
        
        postagem.save((error) => {
            if (error) {
                res.status(400).json({ mensagem: 'Erro ao alterar a postagem!' })
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
            res.status(400).json({ mensagem: 'Id da postagem não foi encontrado!' })
        }
        res.status(200).json({ mensagem: 'Postagem excluida com sucesso!' })
    })
})


// --------------------------------------------------------------------------------------
// Rotas dos usuarios
// Obter todos os usuarios
router.get('/usuarios', async(req, res) => {
    Usuario.find((error, usuarios) => {
        if (error) {
            res.status(400).json({ mensagem: 'Erro ao tentar obter todos os usuários!' })
        }
        res.status(200).json(usuarios)
    })
})


// Obter um usuario
router.get('/usuarios/:id', async(req, res) => {
    const { id } = req.params
    Usuario.findById(id, (error, usuario) => {
        if (error) {
            res.status(400).json({ mensagem: 'Id do usuário não encontrado!' })
        }
        res.status(200).json(usuario)
    })
})


// Criar usuario
router.post('/usuarios/criar', async(req, res) => {
    const { 
        nome, 
        dataNascimento,  
        telefone, 
        email, 
        senha,
        bairro,
        cidade,
        estado 
    } = req.body

    const usuario = new Usuario()

    usuario.nome = nome
    usuario.dataNascimento = dataNascimento
    usuario.telefone = telefone
    usuario.email = email
    usuario.senha = senha
    usuario.bairro = bairro
    usuario.cidade = cidade
    usuario.estado = estado

    usuario.save((error) => {
        if (error) {
            res.status(400).json({ mensagem: 'Erro ao tentar salvar o usuário!' })
        }
        res.status(200).json({ mensagem: 'Usuário cadastrado com sucesso!' })
    })
})


// Alterar usuario
router.put('/usuarios/alterar/:id', async(req, res) => {
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
    } = req.body

    Usuario.findById(id, (error, usuario) => {
        if (error) {
            res.status(400).json({ mensagem: 'Id do usuário não encontrado!' })
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
                res.status(400).json({ mensagem: 'Erro ao alterar o usuário!' })
            }
            res.status(200).json({ mensagem: 'Usuário atualizado com sucesso!' })
        })
    })

})


// Deletar usuario
router.delete('/usuarios/deletar/:id', async(req, res) => {
    const { id } = req.params

    Usuario.deleteOne({_id: id}, (error) => {
        if (error) {
            res.status(400).json({ mensagem: 'Id do usuário não foi encontrado!' })
        }
        res.status(200).json({ mensagem: 'Usuário excluido com sucesso!' })
    })
})






// Padronizando rotas (ex.: .../api/postagens)
app.use('/api', router)

// Inicializando servidor
app.listen(configuracao.porta, () => {
    console.log(`App running *${configuracao.porta}...`)
})
