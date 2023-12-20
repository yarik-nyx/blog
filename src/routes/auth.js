import { Router } from "express";
import {regValidator} from '../validations/auth.js'
import {userController} from '../controllers/UserController.js'
import {checkAuthMid} from '../middlewares/checkAuth.js'
export const authRouter = new Router()

authRouter.get('/', (req, res) => {
    res.send({
        status: 'OK'
    })
})

authRouter.post('/signup', regValidator, userController.register)

authRouter.post('/signin', regValidator, userController.login)

authRouter.get('/me', checkAuthMid, userController.getMe)

