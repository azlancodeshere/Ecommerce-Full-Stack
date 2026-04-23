import React, {useState} from "react"
import { BASE_URL } from "../../api";
import api from "../../api"
import { toast } from "react-toastify";

const CartItem = ({item, setCartTotal,cartitems,setCartItems, setNumberCartItems}) => {

  const [quantity, setQuantity]= useState(item.quantity)
  const [loading, setLoading]= useState(false)

  const itemData = {quantity:quantity, item_id:item.id}
  const itemId = {item_id: item.id}
 
  function deleteCartitem(){
    const confirmDelete = window.confirm("Are you want to delete this cartitem")
    if(confirmDelete){
      api.post(`/api/delete_cartitem/`,itemId)
      .then(res =>{
        console.log(res.data)
        toast.success("Cartitem deleted successfully")
         setCartItems(cartitems.filter(cartitem =>cartitem.id !== item.id))

         setCartTotal(cartitems.filter((cartitem)=> cartitem.id !== item.id) 
         .reduce((acc, curr)=> acc + curr.total, 0))

        setNumberCartItems(cartitems.filter((cartitem)=> cartitem.id !== item.id)
        .reduce((acc, curr)=> acc + curr.quantity, 0))

      })

      .catch(err=>{
        console.log(err.message)
      })
    }

  }

  function updateCartitem(){
    setLoading(true)
    api.patch('/api/update_quantity/', {
  item_id: item.id,
  quantity: Number(quantity)
})
    .then(res=>{
      console.log(res.data)
      setLoading(false)
      toast.success("Cart updated successfully!")

      setCartTotal(cartitems.map((cartitem)=> cartitem.id === item.id ? res.data.data : cartitem).reduce((acc, curr)=> acc + curr.total, 0))

    setNumberCartItems(cartitems.map((cartitem)=> cartitem.id === item.id ? res.data.data : cartitem).reduce((acc, curr)=> acc + curr.quantity, 0))

    })
    .catch(err=>{
      console.log(err.message)
      setLoading(false)

    })
  }





  return (
    <div className="col-md-12">
      
      <div
        className="cart-item d-flex align-items-center mb-3 p-3"
        style={{ backgroundColor: "#f8f9fa", borderRadius: "5px" }}
      >
        <img
          src={item.product.image}
          alt="Product Image"
          className="img-fluid"
          style={{
            width: "80px",
            height: "80px",
            objectFit: "cover",
            borderRadius: "5px",
          }}
        />

        <div className="ms-3 flex-grow-1">
          <h5 className="mb-1">{item.product.name}</h5>
          <p className="mb-0 text-muted">{`$${item.product.price}`}</p>
        </div>

        <div className="d-flex align-items-center">
          <input
            type="number"
            className="form-control me-3"
            min="1"
             value={quantity}
            
            onChange={(e)=> setQuantity(Number(e.target.value))}
            style={{ width: "70px" }}
          />
          <button className="btn btn-sm mx-2" onClick={updateCartitem } style={{backgroundColor: "#4b4bcb", color:"white" }} disabled={loading}>{loading ? "Updating": "Update"}</button>
          <button className="btn btn-danger btn-sm" onClick={deleteCartitem}>Remove</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;