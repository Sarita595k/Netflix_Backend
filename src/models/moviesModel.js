import mongoose from "mongoose";
// import isURL from "validator/lib/isURL.js";

const moviesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }, genre: {
        type: String
    },
    thumbnail: {
        type: String,
        // validate: {
        //     validator: function (value) {
        //         return isURL(value)
        //     },
        //     message: "Enter a valid url"
        // }
    },
    videoUrl: {
        type: String,
        // validate: {
        //     validator: function (value) {
        //         return isURL(value)
        //     },
        //     message: 'enter a valid url for the video'
        // }
    }
})

export const Movie = new mongoose.model('Movie', moviesSchema)