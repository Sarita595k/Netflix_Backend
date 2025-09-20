import jwt from "jsonwebtoken"

export const jwtAuth = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json({ message: "No token found" })
    }

    const token = authHeader.split(" ")[1]
    if (!token) {
        return res.status(401).json({ message: "No token found" })
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY_FOR_JWT)
        req.user = decoded
        next()
    } catch (err) {
        return res.status(401).json({
            message: "Token expired or invalid",
            error: err.message
        })
    }
}