const path = require('path');
const dbProducts = require(path.join(__dirname,'..','data','dbProducts'));

module.exports = {
    index:function(req,res){
        res.render('index', { 
            title: 'Express' 
        });
    }
}