module.exports = function sessionUserCheck(req,res,next){
    if(req.session.user.rol == 'admin'){
        next()
    }else{
        req.session.url = req.originalUrl;
        res.redirect('/')
    }
}