const path = require('path');
const dbProducts = require(path.join(__dirname,'..','data','dbProducts'))


module.exports = {
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