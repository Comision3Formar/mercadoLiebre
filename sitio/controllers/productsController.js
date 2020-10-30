const fs = require('fs');
const path = require('path');


const {validationResult} = require('express-validator');
const db = require('../database/models');


module.exports = { //exporto un objeto literal con todos los metodos
    listar: function(req, res) {
            db.Stores.findOne({
                where:{
                    id_usuario:req.session.user.id
                }
                })
                .then(tienda => {
                    console.log(tienda)
                    db.Products.findAll({
                        where:{
                            id_tienda:tienda.dataValues.id
                        }
                    })
                    .then(result => {
                        res.send(result)
                    })
                    .catch(error => {
                        res.send(error)
                    })
                })
                .catch(error => {
                    res.send(error)
                })
           
    },
    search: function(req, res) {
        if(req.query.search == ""){
            res.redirect('/')
        }

        let buscar = req.query.search;

        db.Products.findAll()
        .then(result => {
            res.render('products', {
                title: "Resultado de la búsqueda",
                productos: result,
                css:'index.css'
            })
        })
        .catch(err => {
            res.send(err)
        })
       
       
   
    },
    detalle: function(req, res) {

        let id = req.params.id;
        let producto = dbProducts.filter(producto => {
            return producto.id == id
        })
        res.render('productDetail', {
                title: "Detalle del Producto",
                css:'product.css',
                id: id,
                producto: producto[0]
            }) //muestra el detalle de un producto
    },
    agregar: function(req, res) {
    
            db.Categories.findAll({
                order:[
                    'nombre'
                ]
            })
            .then(categorias => {
                res.render('productAdd', {
                    title: "Agregar Producto",
                    css:'index.css',
                    categorias: categorias
                }) 
            })
    },
    publicar: function(req, res, next) {
        let errores = validationResult(req);
        if(errores.isEmpty()){

            db.Users.findOne({
                where:{
                    id:req.session.user.id
                },
                include:[{association: "tienda"}]
            })
            .then(user => {
                console.log(user)
                db.Products.create({
                    nombre:req.body.nombre.trim(),
                    precio:Number(req.body.precio),
                    descuento:Number(req.body.descuento),
                    descripcion:req.body.descripcion,
                    imagenes:req.files[0].filename,
                    id_tienda:user.tienda.id,
                    id_categoria:Number(req.body.categoria)
                })
                .then(result => {
                    console.log(result)
                    res.redirect('/')
                })
                .catch(err => {
                    res.send(err)
                })
            })
            .catch(err => {
                res.send(err)
            })
        }else{
            db.Categories.findAll({
                order:[
                    'nombre'
                ]
            })
            .then(categorias => {
                let oldCategoria;
                if(req.body.categoria){
                    categorias.forEach(categoria => {
                        if(categoria.id == req.body.categoria){
                            oldCategoria = categoria.nombre
                        }
                    });
                }
                res.render('productAdd', {
                    title: "Agregar Producto",
                    css:'product.css',
                    categorias: categorias,
                    errors: errores.mapped(),
                    old:req.body,
                    oldCategoria:oldCategoria
                }) 
            })
        }

      
    },
    show: function(req, res) {
        let idProducto = req.params.id;
     
    // AGREGUÉ LA LOGICA PARA DETERMINAR QUE SOLAPA SE MUESTRA EN FUNCIÓN DEL VALOR DEL PARAMETRO :flap
    //***********************************************************************************
        let flap = req.params.flap;
        let activeDetail;
        let activeEdit;
        let showDetail;
        let showEdit;
        if(flap == "show"){
            activeDetail = "active";
            showDetail = "show";
        }else{
            activeEdit = "active";
            showEdit = "show";
        }
    //***********************************************************************************

        let resultado = dbProducts.filter(producto => {
            return producto.id == idProducto
        })
        res.render('productShow', {
            title: "Ver / Editar Producto",
            css:'product.css',
            total: dbProducts.length,
            producto: resultado[0],
            categorias: dbCategories,
            //envío las variables correspondientes para ser usadas en la vista
            activeEdit:activeEdit,
            activeDetail:activeDetail,
            showEdit:showEdit,
            showDetail:showDetail
      
        })

    },
    editar: function(req, res, next) {
        let idProducto = req.body.id;
        dbProducts.forEach(producto => {
            if (producto.id == idProducto) {
                producto.id = Number(req.body.id);
                producto.name = req.body.name.trim();
                producto.price = Number(req.body.price);
                producto.discount = Number(req.body.discount);
                producto.category = req.body.category.trim();
                producto.description = req.body.description.trim();
                producto.image = (req.files[0]) ? req.files[0].filename : producto.image
            }
        })

        fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), JSON.stringify(dbProducts))
        res.redirect('/products/show/' + idProducto + '/show')
    },
    eliminar: function(req, res) {
        let idProducto = req.params.id;
        dbProducts.forEach(producto => {
            if (producto.id == idProducto) {
                aEliminar = dbProducts.indexOf(producto)
                dbProducts.splice(aEliminar, 1)
            }
        })
        fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), JSON.stringify(dbProducts))
        res.redirect('/users/profile')
    }
}