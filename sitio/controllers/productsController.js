const path = require('path');
const dbProducts = require(path.join(__dirname,'..','data','dbProducts'))
const dbCategorias = require('../data/dbCategorias');

module.exports = {
    listar:function(req,res){
        res.send(dbProducts)
    },
    detalle:function(req,res){
        idProducto = req.params.id;
        let producto = dbProducts.filter(producto=>{
            return producto.id == idProducto
        })
        res.render('productDetail',{
            title:"Detalle del Producto",
            css:"products.css",
            producto:producto[0]
        })
    },
    search:function(req,res){
        let busqueda = req.query.search;
        let productos = [];
        dbProducts.forEach(producto=>{
            if(producto.name.toLowerCase().includes(busqueda.toLowerCase())){
                productos.push(producto)
            }
        })
        res.render('products',{
            title: "Resultado de la busqueda",
            css:"index.css",
            productos:productos
        })
    },
    agregar:function(req,res){
        let categoria;
        let sub;
        if(req.query.categoria){
            categoria = req.query.categoria;
            sub = req.query.sub
        }
        res.render('productAdd',{
            title: "Publicar Producto",
            css:"products.css",
            categorias:dbCategorias,
            categoria:categoria,
            sub:sub
        })
    },
    publicar:function(req,res){
        res.send(req.body)
    }
}
