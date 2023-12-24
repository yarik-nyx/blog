import {initModels} from '../models/init-models.js'
import {db} from '../db/db.js'

class PostRepo{
    constructor(){
        this.models = initModels(db)
    }

    async getAllPosts(){
        return await this.models.posts.findAll({      
            include:{
                as: 'users',
                model: this.models.users,
                attributes: {
                    exclude: ['hashedpass']
                }
            }
        })
        
    }

    async getTags(){
        return await this.models.posts.findAll({
            attributes: ['tags']
        })
    }

    async getPost(id){
        await this.models.posts.increment(
            {viewcount: +1},
            {
                where: {id}
            }    
        )
        return await this.models.posts.findOne({
            where: {id},      
            include:{
                as: 'users',
                model: this.models.users,
                attributes: {
                    exclude: ['hashedpass']
                }   
            }
        })
    }

    async createPost(body){
        return await this.models.posts.create(body)
        
    }

    async updatePost(id, body){

        const post =  await this.models.posts.update(
            body,
            {where: {id}}
        )

        return post
    }

    async delPost(id){
        return await this.models.posts.destroy({where:{id}})
    }
}

export const postRepo = new PostRepo()