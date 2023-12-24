import {initModels} from '../models/init-models.js'
import {db} from '../db/db.js'

class UserRepo{
    constructor(){
        this.models = initModels(db)
    }

    async findUserByEmail(email){
        const user = await this.models.users.findOne({where : {email}})
        return user
    }

    async findUserById(id){
       
        const user = await this.models.users.findOne({where : {id}})
        return user
    }

    async saveUser(email, hashedpass){
        const user = await this.models.users.create({email, hashedpass})
        return user
    }
}

export const userRepo = new UserRepo()

