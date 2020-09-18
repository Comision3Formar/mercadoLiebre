
const path = require('path');
const multer = require('multer');

let storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/images/users')
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

module.exports = multer({storage:storage})