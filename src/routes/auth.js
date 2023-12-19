import { Router } from "express";
import {regValidator} from '../validations/auth.js'
import {userController} from '../controllers/UserController.js'
export const authRouter = new Router()

authRouter.get('/', (req, res) => {
    res.send({
        status: 'OK'
    })
})

authRouter.post('/signin', regValidator, userController.register)

authRouter.post('/signup', regValidator)

