import { Router } from "express";
import multer from 'multer'
import {checkAuthMid} from '../middlewares/checkAuth.js'

const storage = multer.diskStorage({
    destination: (_,__, cb) =>{
        cb(null, 'src/uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({storage})

export const uploadRouter = new Router()

uploadRouter.post('/', checkAuthMid, upload.single('image'), (req, res, next) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})