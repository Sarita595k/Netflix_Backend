import { Movie } from "../models/moviesModel.js"

// controller to get all the movies

export const movieList = async (req, res) => {
    try {
        const moviesAre = await Movie.find()
        if (!moviesAre) {
            return res.json({ message: "Error in showing movies list" })
        }
        return res.json({ moviesAre })
    } catch (err) {
        return res.json({ message: "Error in showing movies list" })
    }
}


// create movie 
export const createMovie = async (req, res) => {

    try {
        // movie saved to db 
        const { title, description, genre } = req.body
        // to get thumbnail image
        const thumbnail = req.files?.thumbnail?.[0]?.filename || null;
        // to get video
        const videoUrl = req.files?.videoUrl?.[0]?.filename || null;
        // movie saved to db
        if (!thumbnail) {
            return res.status(400).json({
                message: "thumbnail and video url are required"
            })
        }
        const movie = new Movie({ title, description, genre, thumbnail, videoUrl })
        await movie.save()

        return res.status(201).json({
            message: "movie created successfully",
            title,
            description,
            genre,
            thumbnail,
            videoUrl
        })
    } catch (err) {
        return res.status(400).json({
            message: "error in creating movie"
        })
    }
}

// update movie by id 

export const updateMovie = async (req, res) => {
    const { id } = req.params
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidator: true
        })

        // if no id find with the given id 
        if (!updatedMovie) {
            return res.status(401).json({
                message: "Error in updating movie"
            })
        }
        return res.status(201).json({
            message: "Movie updated successfully"
        })
    } catch (err) {
        return res.json({ message: "Error in updating the movie", error: err.message })
    }
}

export const deleteMovie = async (req, res) => {
    const { id } = req.params
    try {
        const deletedMovie = await Movie.findByIdAndDelete(id)

        if (!deletedMovie) {
            return res.status(401).json({
                message: "Error in deleting movie"
            })
        }

        return res.json({
            message: "movie deleted successfully"
        })
    } catch (err) {
        return res.status(401).json({
            message: "Error in deleting movie"
        })
    }
}