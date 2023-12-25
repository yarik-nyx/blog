import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import {authRouter} from './src/routes/auth.js'
import {postRouter} from './src/routes/post.js'
import {uploadRouter} from './src/routes/upload.js'
import {errorMid} from './src/middlewares/errorMid.js'

dotenv.config()
const app = express()

app.use(cors())

//body json
app.use(express.json())
app.use(errorMid)


app.use('/uploads', express.static('src/uploads'))
app.use('/auth', authRouter)
app.use('/posts', postRouter)
app.use('/uploads', uploadRouter)



const PORT = process.env.PORT || 4444



app.listen(PORT, (err) => {
    if(err){
        return console.log(err);
    }
    console.log(`Server started on port:${PORT}`);
})
