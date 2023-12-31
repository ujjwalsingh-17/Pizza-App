import axios from 'axios'
import Noty from 'noty'
import admin from '../../app/http/middlewares/admin'
import {initAdmin} from './admin'

let addToCart= document.querySelectorAll('.add-to-cart')
let cartCounter=document.querySelector('#cartCounter')

function updateCart(pizza){
    //axios.post(route,data)
axios.post('/update-cart', pizza).then(res =>{
    // console.log(res)
    cartCounter.innerText = res.data.totalQty

    //for item added to cart animatin
    new Noty({
        type:'success',
        timeout:1000,
        progressBar: false,
        text: 'Item added to cart'
    }).show()

}).catch(err =>{
    new Noty({
        type:'error',
        timeout:1000,
        progressBar: false,
        text: 'Something went wrong'
    }).show()
})
}

addToCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{

        let pizza =JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
        // console.log(pizza)
    })
})


//Removing alert message after x seconds in order.ejs
const alertMsg= document.querySelector('#success-alert')
if(alertMsg){
    setTimeout(()=>{
        alertMsg.remove()
    },2000)
}



// to check if we are in admin panel then only initAdmin() will be called
let adminAreaPath=window.location.pathname
if(adminAreaPath.includes('admin')){
    initAdmin()
}