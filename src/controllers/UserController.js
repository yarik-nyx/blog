import {validationResult} from 'express-validator'

class UserController{
    async register(req, res, next){
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).send({
                errors: errors.array({onlyFirstError:true})
            })
        }
        res.send({
            success: 'OK'
        })
    }
}

export const userController = new UserController()