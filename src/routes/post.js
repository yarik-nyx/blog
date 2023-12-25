import { Router } from "express";
import { checkAuthMid } from '../middlewares/checkAuth.js'
import { postValidator } from '../validations/post.js'
import { postController } from '../controllers/PostController.js'
import { validErrorsMid } from '../middlewares/handleValidationErrors.js'

export const postRouter = new Router()


postRouter.get('/', postController.getAllPosts)

postRouter.get('/tags', postController.getTags)

postRouter.get('/:id', postController.getPost)

postRouter.post('/', checkAuthMid, postValidator, validErrorsMid, postController.createPost)

postRouter.patch('/:id',checkAuthMid, postValidator, validErrorsMid, postController.updatePost)

postRouter.delete('/:id', checkAuthMid, postController.delPost)