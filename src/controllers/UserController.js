import {validationResult} from 'express-validator'
import {userService} from '../services/UserService.js'

class UserController{
    async register(req, res, next){
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).send({
                    errors: errors.array({onlyFirstError:true})
                })
            }
            const{email, password} = req.body
            const user = await userService.saveUser(email, password)
            res.send({
                success: 'OK',
                user
            })
        } catch (error) {
            next(error)
        }

    }

    async login(req, res, next){
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).send({
                    errors: errors.array({onlyFirstError:true})
                })
            }
            const{email, password} = req.body

            const user = await userService.logUser(email, password)

            res.send({
                success: 'OK',
                user
            })
        } catch (error) {
            next(error)
        }
    }

    async getMe(req, res, next){
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).send({
                    errors: errors.array({onlyFirstError:true})
                })
            }
            const user = await userService.getUser(req.userId)
            
            res.send({
                success: 'OK',
                user
            })
        } catch (error) {
            next(error)
        }
    }
}

export const userController = new UserController()