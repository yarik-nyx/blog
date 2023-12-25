
import {postService} from '../services/PostService.js'

class PostController{
    async createPost(req, res, next){
        try {
            req.body.userid = req.userId
            const post = await postService.createPost(req.body)

            res.send({
                success:'OK',
                post
            })
            

        } catch (error) {
            next(error)
        }
    }

    async getAllPosts(req, res, next){
        try {
            const posts = await postService.getAllPosts()
            res.send({
                success:'OK',
                posts:posts
            })

        } catch (error) {
            next(error)
        }
    }
    
    async getPost(req, res, next){
        try {

            const{id} = req.params
            const post = await postService.getPost(id)
            res.send({
                success:'OK',
                post
            })

        } catch (error) {
            next(error)
        }
    }

    async getTags(req, res, next){
        try {
            const tags = await postService.getTags()
            res.send({
                success: 'OK',
                tags
            })
        } catch (error) {
           next(error) 
        }
    }

    async updatePost(req, res, next){
        try {
            const{id} = req.params
            const post = await postService.updatePost(id, req.body, req.userId)
            res.send({
                success:'OK',
                post
            })

        } catch (error) {
            next(error)
        }
    }

    async delPost(req, res, next){
        try {      
            const{id} = req.params
            const post = await postService.delPost(id, req.userId)
            res.send({
                success:'OK',
                post
            })

        } catch (error) {
            next(error)
        }
    }
}

export const postController = new PostController()