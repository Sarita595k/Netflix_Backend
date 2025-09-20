export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role == 'admin') {
        console.log(req.user.role)
        next()
    } else {
        return res.status(401).json({ message: "Access denied. Only admin can access this." })
    }
}