const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');

const {validationResult} = require('express-validator');


const dbProducts = require(path.join(__dirname,'..','data','dbProducts'))
const dbUsers = require(path.join(__dirname,'..','data','dbUsers'))

const db = require('../database/models');


module.exports = {
    register:function(req,res){
        res.render('userRegister',{
            title:"Registro de Usuario",
            css: 'index.css'
        })
    },
    processRegister:function(req,res){
        let errors = validationResult(req);
        
        if(errors.isEmpty()){

            db.Users.create({
                nombre: req.body.nombre.trim(),
                apellido: req.body.apellido.trim(),
                email: req.body.email.trim(),
                password:bcrypt.hashSync(req.body.pass,10),
                avatar: (req.files[0])?req.files[0].filename:"default.png",
                rol:"user"
            })
            .then(usuario => {
                //console.log(usuario)
                return res.redirect('/users/login')
            })
            .catch(err => {
                res.send(err)
            })
    
        }else{
            res.render('userRegister',{
                title:"Registro de Usuario",
                css:"index.css",
                errors:errors.mapped(),
                old:req.body
            })
        }
       
    },
    login:function(req,res){
        res.render('userLogin',{
            title:"Ingresá a tu cuenta",
            css: 'index.css'
        })
    },
    processLogin:function(req,res){
        let errors = validationResult(req);
        if(errors.isEmpty()){

            db.Users.findOne({
                where : {
                    email : req.body.email
                }
            })
            .then( user => {
                req.session.user = {
                    id : user.id,
                    nick : user.nombre + " " + user.apellido,
                    email : user.email,
                    avatar : user.avatar,
                    rol : user.rol
                }
                if(req.body.recordar){
                    res.cookie('userMercadoLiebre',req.session.user,{maxAge:1000*60*60})
                }
                res.locals.user = req.session.user
                return res.redirect('/')
            })
            .catch( err => {
                res.send(err)
            })
           
        }else{
            res.render('userLogin',{
                title: "Ingresá a tu cuenta",
                css:"index.css",
                errors:errors.mapped(),
                old:req.body
            })
        }
    },
    profile:function(req,res){
        db.Users.findByPk(req.session.user.id)
        .then(user => {
            res.render('userProfile',{
                title:"Perfil de usuario",
                css: "profile.css",
                usuario : user
            })
        })
        .catch( error => {
            res.send(error)
        })   
    },
    logout:function(req,res){
        req.session.destroy()
        if(req.cookies.userMercadoLiebre){
            res.cookie('userMercadoLiebre',' ',{maxAge:-1});
        }
        return res.redirect('/')
    }
}