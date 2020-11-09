const {check,validationResult,body} = require('express-validator');

module.exports = [

    check('nombre')
    .isLength({
        min:1
    })
    .withMessage('El nombre del producto es obligatorio'),

    check('precio')
    .isInt({
        min:1
    }).withMessage('El producto debe tener un precio válido'),

    check('descuento')
    .isInt({
        min:1
    }).withMessage('El producto debe tener un descuento válido'),

    check('descripcion')
    .isLength({
        min:1
    })
    .withMessage('El descripcion del producto es obligatorio'),

    body('imagen')
    .custom((value,{req})=>{
        if(!req.files[0]){
            return false
        }else{
            return true
        }
    })
    .withMessage("Tenés que subir una imagen"),

    check('categoria')
    .isLength({
        min:1
    })
    .withMessage('La categoria del producto es obligatoria')

]