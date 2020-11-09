const path = require('path'); //requiero el paquete de path
const multer = require('multer'); //requiero el paquete de multer para manejar archivos

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/images/logos')
    },
    filename: (req, file, callback) => {
        req.fileSave = file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        callback(null, req.fileSave)
    }
});
const fileFilter = function(req, file,callback) {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        req.fileValidationError = "Only Images";
        return callback(null,false,req.fileValidationError);
    }
    callback(null,true);
}

const upload =  multer({
    storage: storage,
    fileFilter:fileFilter
})



module.exports = upload