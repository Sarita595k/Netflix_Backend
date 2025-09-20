import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/userModel.js'

// importing file for importing email html 
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { sendEmail } from '../utils/nodemailer.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// controller for sign up user Credentials
export const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const hashPassword = await bcrypt.hash(password, 10)
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "user already exist. please login" })
        }
        // saving data to user db
        const user = new User({ name, email, password: hashPassword })
        await user.save()
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY_FOR_JWT, { expiresIn: "1h" })

        const emailPath = path.join(__dirname, '../utils/emailTemplate.html')
        let textContent = await fs.readFile(emailPath, 'utf-8')
        textContent = textContent.replace('{{name}}', name)

        await sendEmail(
            user.email,
            'Welcome to Netflix_Clone',
            textContent,
            `<h1>hi ${user.name},welcome to our app!Thanks for signing in!</h1>`

        )

        return res.status(200).json({
            name,
            email,
            password: hashPassword,
            token,
            message: "sign up successfully!",
            success: true
        })
    } catch (err) {
        console.log(err.message)
    }
}


// controller for user login credentials
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.json("No account found with the given email.")
        }
        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            return res.json({ message: "Invalid password" })
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY_FOR_JWT, { expiresIn: "1h" })
        return res.json({ message: "Welcome to the dashboard", token, success: true })
    } catch (err) {
        return res.json({ error: err.message })
    }
}
