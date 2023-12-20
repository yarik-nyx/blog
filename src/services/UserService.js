import dotenv from 'dotenv'
dotenv.config()
import {userRepo} from '../repos/UserRepo.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {ApiError} from '../exceptions/ApiError.js'

class UserService{
    async saveUser(email, password){
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt)

        const foundUser = await userRepo.findUserByEmail(email)
        if(foundUser){
            throw ApiError.BadRequest('Пользователь с такой почтой уже существует.')
        }
        const user = await userRepo.saveUser(email, hashedPass)

        const token = jwt.sign({
            _id: user.id,
            email: user.email
        }, process.env.JWT_KEY, 
        {
            expiresIn: '30d',
        })
        user.dataValues.token = token
        const{hashedpass,firstname, patr, lastname, avatarurl, ...userData}=user.dataValues
        return userData

    }

    async logUser(email, password){
        const user = await userRepo.findUserByEmail(email)
        if(!user){
            throw ApiError.NotFound('Такого пользователя не существует.')
        }

        const isValidPass = await bcrypt.compare(password, user.hashedpass)
        if(!isValidPass){
            throw ApiError.BadRequest('Неверный логин или пароль.')
        }
        const token = jwt.sign({
            _id: user.id,
            email: user.email
        }, process.env.JWT_KEY, 
        {
            expiresIn: '30d',
        })
        user.dataValues.token = token
        const{hashedpass,firstname, patr, lastname, avatarurl, ...userData}=user.dataValues
        return userData

    }

    async getUser(id){
        const user = await userRepo.findUserById(id)
        if(!user){
            throw ApiError.NotFound('Такого пользователя не существует.')
        }
        const{hashedpass, ...userData}=user.dataValues
        return userData
        
    }
}

export const userService = new UserService()
