import {Router} from 'express'
import {UsuarioController} from './../controller/UsuarioController'

const routerUsuario = Router()

// --------------------------------------------------------------------------------------
// Rotas dos usuarios
// Obter todos os usuarios
routerUsuario.get('/', UsuarioController.getAll)


// Obter um usuario
routerUsuario.get('/:id', UsuarioController.get)


// Criar usuario
routerUsuario.post('/criar', UsuarioController.create)


// Alterar usuario
routerUsuario.put('/alterar/:id', UsuarioController.update)


// Deletar usuario
routerUsuario.delete('/deletar/:id', UsuarioController.delete)

export {routerUsuario}