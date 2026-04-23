import React, { useState } from "react";
import CartItem from "./CartItem.jsx";
import CartSummary from "./CartSummery.jsx";
import api from "../../api";
import Spinner from "../ui/Spinner.jsx";
import useCartData from "../../hooks/useCartData.js";
import PaymentSection from "../checkout/PaymentSection.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CartPage = ({ setNumberCartItems }) => {

  const { cartitems, setCartItems, cartTotal, setCartTotal, loading, tax } = useCartData();
  const [ordering, setOrdering] = useState(false);
  const navigate = useNavigate();

  if (loading) return <Spinner loading={loading} />;

  if (!cartitems || cartitems.length < 1) {
    return (
      <div className="alert alert-primary my-5">
        You haven't added any item to your cart.
      </div>
    );
  }

  const handleOrder = async (paymentMethod) => {
    const token = localStorage.getItem("access");
    const cart_code = localStorage.getItem("cart_code");

    if (!token) {
      toast.error("Please login first!");
      return navigate("/login");
    }

    setOrdering(true);

    try {
      await api.post(
        "/api/create_order/",
        {
             name: "Test User",
           address: "Test Address",
          phone: "9999999999",
          payment_method: paymentMethod,
          cart_code,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Order placed successfully!");

      localStorage.removeItem("cart_code");

      // Clear cart
      setCartItems([]);
      setCartTotal(0);
      setNumberCartItems(0);

      // Redirect
      navigate("/");

    } catch (err) {
      console.log("ERROR:", err.response?.data);
      toast.error("Failed to place order!");
    } finally {
      setOrdering(false);
    }
  };

  return (
    <div className="container my-4">
      <h4 className="mb-4">Shopping Cart</h4>

      <div className="row g-4">

      
        <div className="col-md-8">
          {cartitems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              cartitems={cartitems}
              setCartTotal={setCartTotal}
              setNumberCartItems={setNumberCartItems}
              setCartItems={setCartItems}
            />
          ))}
        </div>

        {/* RIGHT */}
        <div className="col-md-4">
          <CartSummary cartTotal={cartTotal} tax={tax} />

          <PaymentSection
            handleOrder={handleOrder}
            loading={ordering}
          />
        </div>

      </div>
    </div>
  );
};

export default CartPage;