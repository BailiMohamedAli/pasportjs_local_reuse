//authentication middleware to prevent unauthorized accec to certain routes
module.exports.isAuth = (req, res, next) =>{
    if(req.isAuthenticated()){
        next();
    } else {
        res.status(401).redirect('/loginfail');
    }
}