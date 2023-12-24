import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
import {ApiError} from '../exceptions/ApiError.js'

export async function checkAuthMid(req, res, next){
    let token = req.headers.authorization

    if(token){
        if(token.includes('Bearer')){
            token = token.split(" ")[1]
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY)
            req.userId = decoded._id
            next()
        } catch (error) {
            next(ApiError.BadRequest('Нет доступа.'))
        }
    } else {
        next(ApiError.BadRequest('Нет доступа.'))
    }


}