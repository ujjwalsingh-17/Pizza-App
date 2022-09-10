function cartController(){
    
    return{
       index(req,res){
        res.render("customers/cart")
       },
       update(req,res){

        //format of data stored in cart

    //    let cart={
    //     items:{
    //         pizzaId: {
    //             item: pizzaObject,
    //             qty: 0
    //         },
    //         totalQty: 0,
    //         totalPrice: 0
    //     }
    //    }
    //    }

    //check if no cart exits in the session then create the first empty cart in the session
    if(!req.session.cart){
        req.session.cart ={
            items:{},
            totalQty: 0,
            totalPrice: 0
        }
    }

    let cart=req.session.cart
    // console.log(req.body)

    // check if the item we want to add in the cart already exits in the cart
    if(!cart.items[req.body._id]){
        cart.items[req.body._id] ={
            item:req.body,
            qty:1
        }
        cart.totalQty=cart.totalQty +1;
        cart.totalPrice =cart.totalPrice + req.body.price;
    }
    else{
        cart.items[req.body._id].qty= cart.items[req.body._id].qty +1;
        cart.totalQty=cart.totalQty +1;
        cart.totalPrice=cart.totalPrice + req.body.price;
    }
    return res.json({totalQty: req.session.cart.totalQty })
       }
    }
}

module.exports=cartController