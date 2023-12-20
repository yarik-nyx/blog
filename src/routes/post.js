import { Router } from "express";
import {checkAuthMid} from '../middlewares/checkAuth.js'
import { postValidator } from '../validations/post.js'
import { postController } from '../controllers/PostController.js'

export const postRouter = new Router()

postRouter.get('/', postController.getAllPosts)

postRouter.get('/:id', postController.getPost)

postRouter.post('/', checkAuthMid, postValidator, postController.createPost)

postRouter.patch('/:id',checkAuthMid, postValidator, postController.updatePost)

postRouter.delete('/:id', checkAuthMid, postController.delPost)