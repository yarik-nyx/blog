import dotenv from 'dotenv'
dotenv.config()
import {ApiError} from '../exceptions/ApiError.js'
import {postRepo} from '../repos/PostRepo.js'

class PostService{
    async getAllPosts(){
        const posts = await postRepo.getAllPosts()
        return posts
    }

    async getPost(id){
        return await postRepo.getPost(id)
    }

    async createPost(body){
        return await postRepo.createPost(body)

    }

    async updatePost(id, body, userId){
        const post = await postRepo.getPost(id)
        if(!post){
            throw ApiError.BadRequest('Такого поста не существует.')
        }
        if(post.userid == userId){
             await postRepo.updatePost(id, body)
             return await postRepo.getPost(id)
        } else {
            throw ApiError.UnathorizedError('Нет доступа для редактирования этой статьи.')
        }
        
    }

    async delPost(id, userId){
        const post = await postRepo.getPost(id)
        if(!post){
            throw ApiError.BadRequest('Такого поста не существует.')
        }
        if(post.userid == userId){
            return await postRepo.delPost(id)
        } else {
            throw ApiError.UnathorizedError('Нет доступа для удаления этой статьи.')
        }

        
    }
}

export const postService = new PostService()