require("dotenv").config();

import {routerPost} from './routes/postRoute';
import {routerUsuario} from './routes/usuarioRoute';


import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';

import {serverConfig} from './config/server'

const app = express();

mongoose.connect(serverConfig.db)


app.use(cors())
app.use(express.json({ limit: '50mb'}))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// Salva imagem no diretório local
app.use(serverConfig.path, express.static(path.resolve(__dirname,'..','public','upload')))

const router = express.Router()

// Middleware
router.use((req, res, next) => {
    console.log('...')
    next()
})



// Padronizando rotas
app.use('/usuario', routerUsuario);
app.use('/postagem',routerPost);

// Inicializando servidor
const PORT = process.env.PORT || serverConfig.porta

app.listen(PORT, () => {
    console.log(`App running in port ${PORT}...`)
})
