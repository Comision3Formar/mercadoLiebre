const { validationResult } = require('express-validator');
const path = require('path');
const db = require('../database/models');
const dbProducts = require(path.join(__dirname,'..','data','dbProducts'));


module.exports = {
    index:function(req,res){
        let visitados = dbProducts.filter(producto=>{
            return producto.category == "visited"
        })
        
        let ofertas = dbProducts.filter(producto=>{
            return producto.category == "in-sale"
        })

        res.render('index', { 
            title: 'Mercado Liebre',
            css:'index.css',
            visitados: visitados,
            ofertas:ofertas
        });
    },

    listCategories:function(req,res){
        db.Categories.findAll()
        .then(categorias => {
            res.render('categoriesList',{
                title: 'Lista de Categorias',
                css: 'index.css',
                categorias:categorias
            })

        })
        .catch(error => {
            console.log(error)
        })
    },

    addCategorie:function(req,res){
        res.render('categoriesAdd',{
            title: 'Añadir Categoria',
            css: 'index.css',
        })
    },

    saveCategorie:function(req,res){
        let errores = validationResult(req);
        if(errores.isEmpty()){
            db.Categories.create({
                nombre:req.body.nombre.trim(),
                imagen:(req.files[0])?req.files[0].filename:"categorie.png",
            })
            .then(result => {
                console.log("Categoria añadida");
                res.redirect('/admin/categorieList')
            })
            .catch(error => {
                console.log(error)
            })
        }else{
            res.render('categoriesAdd',{
                title:'Añadir Categoria',
                css:'index.css',
                errors: errores.mapped(),
                old:req.body
            })
        }
    }
}