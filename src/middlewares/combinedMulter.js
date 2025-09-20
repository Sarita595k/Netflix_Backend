// combinedMulter.js
import multer from 'multer';
import path from 'path';
import fs from 'fs'

// Allowed MIME types
const allowedTypes = [
    'video/mp4',
    'video/x-matroska',   // for .mkv files
    'video/quicktime',     // for .mov files
    'image/jpeg',
    'image/png',
    'image/jpg'
];
// Storage configuration
const uploadThumbnail = 'uploads/thumbnails'
const uploadVideo = 'uploads/videos'

// creating storage file 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        if (file.fieldname === 'thumbnail') {
            // if folder does not exist then
            if (!fs.existsSync(uploadThumbnail)) {
                fs.mkdirSync(uploadThumbnail, { recursive: true })
            }
            cb(null, uploadThumbnail);
        } else if (file.fieldname === 'videoUrl') {
            if (!fs.existsSync(uploadVideo)) {
                fs.mkdirSync(uploadVideo, { recursive: true })
            }
            cb(null, uploadVideo);
        } else {
            cb(new Error('Invalid fieldname'), false);
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    // allowed only right file type
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file type'), false);
    }
};

// Exporting multer instance
export const mediaUpload = multer({ storage, fileFilter });
