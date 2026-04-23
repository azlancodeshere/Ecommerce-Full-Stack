import React from "react";
import OrderSummary from "./OrderSummery";
import PaymentSection from "./PaymentSection";
import useCartData from "../../hooks/useCartData.js";



const CheckoutPage = () => {


  const  {cartitems, setCartItems, cartTotal, setCartTotal, loading, tax}= useCartData()
  return (
    <div className="container my-3">
      <div className="row">
        <OrderSummary cartitems={cartitems} cartTotal={cartTotal} tax={tax} />
        
      </div>
    </div>
  );
};

export default CheckoutPage;