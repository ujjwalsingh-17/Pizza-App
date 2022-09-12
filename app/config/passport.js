const LocalStrategy=require('passport-local').Strategy
const User=require('../models/user.js')
const bcrypt=require('bcrypt')
function init(passport){

passport.use(new LocalStrategy({usernameField: 'email'},async (email,password,done)=>{
   //done is a callback
    //login
    //check if email exists
    const user=await User.findOne({email:email}) //first email is from the schema and second email is from the function above called in passport
    if(!user){
        return done(null, false, {message:'No user with this email'})
    }

    bcrypt.compare(password,user.password).then(match =>{
        if(match){
            return done(null,user,{message:'Logged in successfully'})
        }
        return done(null,false,{message:'Wrong username or password'})

    }).catch(err =>{
        return done(null,false,{message:'Something went wrong'})
    })

}))



//storing data in session
passport.serializeUser((user,done)=>{
    done(null,user._id)
})

passport.deserializeUser((id,done)=>{
   User.findById(id,(err,user)=>{
    done(err,user)
   })
})

}




module.exports=init