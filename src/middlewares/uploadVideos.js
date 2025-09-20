// import multer from 'multer'
// import path from 'path'
// import fs from 'fs'

// const uploadPathIs = 'uploads/video'

// export const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         if (!fs.existsSync(uploadPathIs)) {
//             fs.mkdirSync(uploadPathIs, { recursive: true })
//         } cb(null, uploadPathIs)
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
//     }
// })


// export const fileFilter = (req, file, cb) => {
//     const allowedTypes = ['video/mp4', 'video/quicktime', 'video/x-matroska']
//     if (allowedTypes.includes(file.mimetype)) {
//         cb(null, true)
//     } else {
//         cb(new Error("invalid file type. Only mp4 and mov file type is valid."))
//     }
// }


// // export const uploadVideo = multer({ storage: storage, limits: { fileSize: 100 * 1024 * 1024 }, fileFilter: fileFilter })