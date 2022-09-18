function auth(req,res,next){
    if(req.isAuthenticated()){  //from passport
        return next()
    }  
    return res.redirect("/login")
}

module.exports=auth