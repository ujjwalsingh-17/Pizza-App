const Menu=require('../../models/menu')



function homeController(){
    //factory function

    return{
        async index(req,res){
            const pizzas=await Menu.find()
            // console.log(pizzas)
            return res.render("home",{pizzas:pizzas})
            // Menu.find().then(function(pizzas){
            //     console.log(pizzas)
            //     res.render("home",{pizzas:pizzas})
            // })
           
        }
    }

}


module.exports=homeController