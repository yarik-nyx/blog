import { Router } from "express";
import {regValidator} from '../validations/auth.js'
import {userController} from '../controllers/UserController.js'
import {checkAuthMid} from '../middlewares/checkAuth.js'
import { validErrorsMid } from '../middlewares/handleValidationErrors.js'

export const authRouter = new Router()

authRouter.post('/signup', regValidator, validErrorsMid, userController.register)

authRouter.post('/signin', regValidator, validErrorsMid, userController.login)

authRouter.get('/me', checkAuthMid, userController.getMe)
