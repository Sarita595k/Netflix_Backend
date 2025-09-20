import express from 'express'
import { loginUser, signupUser } from '../controller/userController.js'
import { jwtAuth } from '../middlewares/auth.js'
import { isAdmin } from '../middlewares/isAdmin.js'
const router = express.Router()

router.post('/signup', signupUser)
router.post('/login', loginUser)

router.get('/admin-dashboard', jwtAuth, isAdmin, (req, res) => {
    res.json({ message: "Welcome to Admin Dashboard!" })
})

export default router