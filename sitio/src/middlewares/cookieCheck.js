module.exports = function(req,res,next){
    if(req.cookies.userMercadoLiebre){
        console.log(req.cookies.userMercadoLiebre)
        req.session.user = req.cookies.userMercadoLiebre;
        res.locals.user = req.session.user  
        next()
    }else{
        next()
    }
}