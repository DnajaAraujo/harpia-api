import {Router} from 'express'
import {UsuarioController} from './../controller/UsuarioController'

import multer from 'multer';
import multerConfig from '../config/multer'

const routerUsuario = Router()

// --------------------------------------------------------------------------------------
// Rotas dos usuarios
// Obter todos os usuarios
routerUsuario.get('/', UsuarioController.getAll)

// Retorna todas as imagens do perfil
routerUsuario.get('/imagem', UsuarioController.getImg)

// Obter um usuario
routerUsuario.get('/:id', UsuarioController.get)


// Criar usuario
routerUsuario.post('/criar',multer(multerConfig).single("perfilImg"), UsuarioController.create)


// Alterar usuario
routerUsuario.put('/alterar/:id', UsuarioController.update)


// Deletar usuario
routerUsuario.delete('/deletar/:id', UsuarioController.delete)

// Retorna as informações da imagem do perfil
routerUsuario.get('/:id/imagemPerfil', UsuarioController.getImageProfile)

export {routerUsuario}