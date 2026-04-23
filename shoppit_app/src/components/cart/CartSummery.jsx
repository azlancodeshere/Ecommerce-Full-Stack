import React from "react";
import styles from "./CartSummery.module.css";

const CartSummary = ({ tax = 0, cartTotal = 0 }) => {
  const subTotal = Number(cartTotal).toFixed(2);
  const cartTax = Number(tax).toFixed(2);
  const total = (Number(cartTotal) + Number(tax)).toFixed(2);

  return (
    <div className={styles.card}>
      <h5 className={styles.title}>Cart Summary</h5>

      <div className={styles.row}>
        <span>Subtotal</span>
        <span>${subTotal}</span>
      </div>

      <div className={styles.row}>
        <span>Tax</span>
        <span>${cartTax}</span>
      </div>

      <div className={`${styles.row} ${styles.total}`}>
        <span>Total</span>
        <strong>${total}</strong>
      </div>
    </div>
  );
};

export default CartSummary;