const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure the 'uploads' directory exists
const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Set storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname || Date.now() + path.extname(file.originalname));
    },
});

// Create multer instance
const upload = multer({ storage });

module.exports = { upload };


