import { User } from "../models/userModel.js";
import dotenv from 'dotenv'
// import mongoose from "mongoose";
import { connectToDB } from "./config.js";
dotenv.config()

await connectToDB()
// updated the user role according to the role 
await User.updateOne({ email: process.env.ADMIN_EMAIL }, { role: "admin" })

// const user = await User.findOne({ email: "sarita595k@gmail.com" })
// console.log(user.role)
console.log("User updated to admin")
process.exit()