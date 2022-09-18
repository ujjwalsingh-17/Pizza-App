const Order=require('../../../models/order')

function orderController(){
    return {
        index(req,res){
            Order.find({status:{$ne: 'completed'}},null,{sort:{'createdAt':-1}}).populate('customerId','-password').exec((err,orders)=>{
                if(req.xhr){
                    // console.log(orders)
                    return res.json(orders)
                }
                // console.log(orders)
               return res.render('admin/orders')
            })
            //$ne means not equal to

            //sort is used to sort the field according to the given field and -1 is used to sort in descending order\

            //in poplulate method the first parameter is for the field which you want to populate and second parameter with  minus sign is used to tell that we dont want passpord field when we poplated the customer
        }
    }
}

module.exports=orderController