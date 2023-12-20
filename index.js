import dotenv from 'dotenv'
import express from 'express'
import {authRouter} from './src/routes/auth.js'
import {postRouter} from './src/routes/post.js'
import {errorMid} from './src/middlewares/errorMid.js'
dotenv.config()
const app = express()


//body json
app.use(express.json())

app.use('/auth', authRouter)
app.use('/posts', postRouter)
app.use(errorMid)

const PORT = process.env.PORT || 4444



app.listen(PORT, (err) => {
    if(err){
        return console.log(err);
    }
    console.log(`Server started on port:${PORT}`);
})
