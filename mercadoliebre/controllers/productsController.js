const path = require('path');
const dbProducts = require(path.join(__dirname,'..','data','dbProducts'))

module.exports = {
    listar:function(req,res){
        res.send(dbProducts)
    }
}