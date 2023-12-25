import {validationResult} from 'express-validator'

export async function validErrorsMid(req, res, next){
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).send({
            errors: errors.array({onlyFirstError:true})
        })
    }
    await next()
}