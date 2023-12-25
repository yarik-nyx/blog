
import {userService} from '../services/UserService.js'

class UserController{
    async register(req, res, next){
        try {
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