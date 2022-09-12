const User=require('../../models/user')
const bcrypt=require('bcrypt')
const flash = require('express-flash')
const passport = require('passport')

function authController(){
    
    return{
        login(req,res){
            res.render("auth/login")
        },

        postLogin(req,res,next){
            const {email, password}=req.body
           
            // Validate request
            if(!email || !password){
                req.flash('error','All fieds are required')
                return res.redirect('/login')
            }


            passport.authenticate('local',(err,user,info)=>{
                if(err){
                    req.flash('error',info.message)
                    return next(err)
                }
                if(!user){
                    req.flash('error',info.message)
                    return res.redirect("/login")
                }

                req.logIn(user,(err)=>{
                    if(err){
                        req.flash('error',info.message)
                        return next(err)
                    }
                    return res.redirect('/')
                })

            })(req,res,next) 
            //passport return a function which we have called in above line
        }
        ,

        register(req,res){
            res.render("auth/register")
        },

        async postRegister(req,res){
            const {name, email, password}=req.body
           
            // Validate request
            if(!name || !email || !password){
                req.flash('error','All fieds are required')
                req.flash('name',name)
                req.flash('email',email)
                return res.redirect('/register')
            }

            //check if email already exits
            User.exists({email: email},(err,result)=>{
                if(result){
                    req.flash('error','Email already exits')
                    req.flash('name',name)
                    req.flash('email',email)
                    return res.redirect('/register')
                }
            })

            //hash password
            const hashedPassword= await bcrypt.hash(password, 10)

            // Create user in database
            const user=new User({
                name: name,
                email: email,
                password: hashedPassword
            })

            user.save().then((user)=>{
                // login after register
                return res.redirect('/')
            }).catch(err =>{
                req.flash('error','Soemthing went wrong')
                return res.redirect('/register')
            })
        }
        ,

        logout(req,res,next){
            req.logout((err =>{
                if(err)
                     return next(err)

                return res.redirect('/login')
            }))   //through passport
            
        }


    }
}

module.exports=authController