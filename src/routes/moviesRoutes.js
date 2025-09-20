import express from 'express'
import { isAdmin } from '../middlewares/isAdmin.js'
import { jwtAuth } from '../middlewares/auth.js'
import { movieList, createMovie, deleteMovie, updateMovie } from '../controller/moviesController.js'
import { mediaUpload } from '../middlewares/combinedMulter.js'
const moviesRouter = express.Router()

// moviesRouter.get('/all-movies', movieList)
// moviesRouter.post('/create-movie', jwtAuth, isAdmin, createMovie)

moviesRouter.get('/all-movies', movieList)
moviesRouter.post('/create-movie', mediaUpload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'videoUrl', maxCount: 1 },
]), jwtAuth, isAdmin, createMovie)
moviesRouter.put('/:id', updateMovie)
moviesRouter.delete('/:id', deleteMovie)

export default moviesRouter