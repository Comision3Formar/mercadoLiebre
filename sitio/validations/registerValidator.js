const {check,validationResult,body} = require('express-validator');

//const dbUsers = require('../data/dbUsers')

let db = require('../database/models');

module.exports = [
    
    check('nombre')
    .isLength({
        min:1
    })
    .withMessage("Debes ingresar tu nombre"),

    check('apellido')
    .isLength({
        min:1
    })
    .withMessage("Debes ingresar tu apellido"),

    check('email')
    .isEmail()
    .withMessage("Debes ingresar un email válido"),

    body('email')
    .custom(function(value){
       return db.Users.findOne({
           where : {
               email : value
           }
       })
       .then(user => {
           if(user){
               return Promise.reject('Este mail ya está registrado en nuestra db')
           }
       })
    }),

    check('pass')
    .isLength({
        min:6,
        max:12
    })
    .withMessage("Debes ingresar una contraseña entre 6 y 12 caracteres"),

    body('pass2')
    .custom((value,{req}) => {
        if(value != req.body.pass){
            return false
        }
        return true
    })
    .withMessage("Las constraseñas no coiciden"),

    check('bases')
    .isString("on")
    .withMessage("Debes aceptar las bases y condiciones")
]