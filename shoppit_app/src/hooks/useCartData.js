
import { useState, useEffect } from "react"
import api from "../api"


function useCartData(){
const [cartitems, setCartItems]= useState([])
    const [cartTotal, setCartTotal] = useState(0.00)
    const tax = 4.00
    const [loading, setLoading]= useState(false)

     
    useEffect(function(){

   
    const cart_code = localStorage.getItem("cart_code")
    
       setLoading(true)
        api.get(`/api/get_cart/?cart_code=${cart_code}`)
       
        .then(res=>{
            console.log(res.data)
            
            setCartItems(res.data.items || [])
            setCartTotal(res.data.sum_total || 0)
            setLoading(false)

        })

        .catch(err=>{
            console.log(err.message)
            setLoading(false)
        })

    },[])

    return {cartitems, setCartItems, cartTotal, setCartTotal, loading, tax}
}

export default useCartData