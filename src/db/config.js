import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

export const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("db connected successfully")
    } catch (err) {
        console.log("error in connecting to the db", err.message)
    }
}