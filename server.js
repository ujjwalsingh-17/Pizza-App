require('dotenv').config()
const express=require('express')
const ejs=require('ejs')
const expressLayout=require('express-ejs-layouts')
const path=require('path')
const mongoose=require('mongoose')
const session=require('express-session')
const flash=require('express-flash')
const MongoDbStore=require('connect-mongo')



const app=express()

const PORT=process.env.PORT || 3000

//Database Connection
const url='mongodb://localhost/pizza'
const connection=mongoose.connection
mongoose.connect(url,{useNewUrlParser:true}).then(()=>{
    console.log("Connected successfully")
}).catch((err)=>{
    console.log("Not connected")
})


//Session store
let mongoStore=new MongoDbStore({
    mongoUrl: 'mongodb://localhost/pizza',
    collection: 'sessions'
})


//session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie:{maxAge: 1000*60*60*24 } //24 hours
            
}))


app.use(flash()) 


//Assets
app.use(express.static('public'))
app.use(express.json())


//global middlewares
app.use((req,res,next)=>{
    res.locals.session=req.session
    next()
})


//set template engine
app.use(expressLayout)
app.set('views',path.join(__dirname, '/resources/views'))
app.set('view engine','ejs')


require('./routes/web.js')(app)





app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
})