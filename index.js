import express from 'express'
import dotenv from 'dotenv'
dotenv.config({ path: 'config.env' })
import cors from 'cors'
import { connectToDB } from './src/db/config.js'
// importing user routes
import router from './src/routes/userRoutes.js'
import moviesRouter from './src/routes/moviesRoutes.js'

const app = express()

// for parsing json data 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// for accessing backend on different port
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// to serve static files 
app.use('/uploads', express.static('uploads'));

// path for user routes 
app.use('/api/users', router)

// path for movie routes 
app.use('/api/movies', moviesRouter)

// test url 
app.get('/', (req, res) => {
    res.send("url is working")
})

// define the port and default port 
const port = process.env.PORT || 5000

// listening the port
app.listen(port, () => {
    connectToDB()
    console.log("server is running at port 5000")
})