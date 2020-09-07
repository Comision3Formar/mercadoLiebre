const path = require('path');
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
    }
}