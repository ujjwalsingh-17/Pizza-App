function guest(req,res,next){
    //if user is not logged in then no prblrm
    if(!req.isAuthenticated()){
        return next()
    }
    // if user is logged in then dont let him lo to login page
    return res.redirect('/')
}

module.exports=guest