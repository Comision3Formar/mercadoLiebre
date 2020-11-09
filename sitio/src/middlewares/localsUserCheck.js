module.exports = function localsUserCheck(req,res,next){
    if(req.session.user){
        res.locals.user = req.session.user  
    }
    next()
}