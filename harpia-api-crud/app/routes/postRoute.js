import {Router} from 'express';

import multer from 'multer';
import multerConfig from '../config/multer'

import {PostagemController} from '../controller/PostagemController';
import {Postagem} from '../models/postagem';

const routerPost = Router();

// ----------------------------------------------------------------------------------------
// Rotas das postagens
// Obter todas as postagens
routerPost.get('/getAll', PostagemController.index);


// Obter uma postagem
routerPost.get('/:id', PostagemController.get);


// Criar postagem
routerPost.post('/criar',multer(multerConfig).single("file") , PostagemController.create);


// Alterar postagem
routerPost.put('/alterar/:id', PostagemController.update)


// Deletar postagem
routerPost.delete('/deletar/:id', PostagemController.delete)


export {routerPost};

