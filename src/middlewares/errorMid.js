import {ApiError} from '../exceptions/ApiError.js'

export async function errorMid(err, req, res, next){
    console.log(err)
    if(err instanceof ApiError){
        
        return res.status(err.status).json({
            message: err.message,
            errors: err.erros
        })
    }
    return res.status(500).json({
        message:'Непредвиденная ошибка',
        errors: err
    })
}