const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');

const {validationResult} = require('express-validator');


const dbProducts = require(path.join(__dirname,'..','data','dbProducts'))
const dbUsers = require(path.join(__dirname,'..','data','dbUsers'))



module.exports = {
    register:function(req,res){
        res.render('userRegister',{
            title:"Registro de Usuario",
            css: 'index.css'
        })
    },
    processRegister:function(req,res){
        //res.send(req.body)
        //res.send(req.files)
        let errors = validationResult(req);
        let lastID = 0;
        if(dbUsers.length != 0){
            dbUsers.forEach(user => {
                if(user.id > lastID){
                    lastID = user.id
                }
            })
        }
        if(errors.isEmpty()){
            let newUser = {
                id: lastID + 1,
                nombre: req.body.nombre.trim(),
                apellido: req.body.apellido.trim(),
                email: req.body.email.trim(),
                avatar: (req.files[0])?req.files[0].filename:"default.png",
                password:bcrypt.hashSync(req.body.pass,10),
                rol:"user"
            }
            dbUsers.push(newUser);
            fs.writeFileSync(path.join(__dirname,'..','data','dbUsers.json'),JSON.stringify(dbUsers),'utf-8')
    
            return res.redirect('/users/login')
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
            dbUsers.forEach(user => {
                if(user.email == req.body.email){
                    req.session.user = {
                        id: user.id,
                        nick: user.nombre + " " + user.apellido,
                        email: user.email,
                        avatar:user.avatar
                    }
                }
            })
            if(req.body.recordar){
                res.cookie('userMercadoLiebre',req.session.user,{maxAge:1000*60*60})
            }
            //res.locals.user = req.session.user
            //console.log(res.locals.user)
            res.redirect('/')
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
        res.render('userProfile',{
            title:"Perfil de usuario",
            css: "profile.css",
            productos: dbProducts.filter(producto =>{
                return producto.category != "visited" && producto.category != "in-sale"
            })
            
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