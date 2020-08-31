const path = require('path');
const dbProducts = require(path.join(__dirname,'..','data','dbProducts'))

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
    }
}