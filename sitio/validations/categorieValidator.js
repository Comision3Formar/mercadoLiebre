const db = require('../database/models');

const {check,validationResult,body} = require('express-validator');

module.exports = [
    body('nombre')
    .custom(value => {
        return db.Categories.findOne({
            where:{
                nombre:value
            }
        })
        .then(categoria => {
            if(categoria){
                return Promise.reject('La categoria ya existe!')
            }
        })
    }),

    check('nombre')
    .isLength({
        min:1
    }).withMessage("El nombre del campo es obligatorio"),

    body('logo')
    .custom((value,{req})=>{
        if(req.fileValidationError){
            return false
        }else{
            return true
        }
    }).withMessage("Solo se permite png, jpg, jpeg, gif"),

    body('logo')
    .custom((value,{req})=>{
        if(!req.files[0]){
            return false
        }else{
            return true
        }
    }).withMessage('Tenés que subir una imagen')
    
    ]