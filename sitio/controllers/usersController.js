const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');

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
        let lastID = 1;
        if(dbUsers.length != 0){
            dbUsers.forEach(user => {
                if(user.id > lastID){
                    lastID = user.id
                }
            })
        }
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
    },
    login:function(req,res){
        res.render('userLogin',{
            title:"Ingresá a tu cuenta",
            css: 'index.css'
        })
    },
    processLogin:function(req,res){

    },
    profile:function(req,res){
        res.render('userProfile',{
            title:"Perfil de usuario",
            css: "profile.css",
            productos: dbProducts.filter(producto =>{
                return producto.category != "visited" && producto.category != "in-sale"
            })
        })
    }
}