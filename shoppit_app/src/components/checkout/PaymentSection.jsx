import React, { useState } from "react";
import styles from "./PaymentSection.module.css";
import { Link } from "react-router-dom";

const PaymentSection = ({ handleOrder }) => {
  const [paymentMethod, setPaymentMethod] = useState("COD");

  return (
    <div>
      <div className={`card ${styles.card}`}>
        
        <div
          className="card-header"
          style={{ backgroundColor: "#60580C", color: "white" }}
        >
          <h5>Payment Method</h5>
        </div>

        <div className="card-body">

          {/* COD */}
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="radio"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label>Cash on Delivery (COD)</label>
          </div>

          {/* CARD */}
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="radio"
              value="CARD"
              checked={paymentMethod === "CARD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label>Credit / Debit Cards</label>
          </div>

          {/* BUTTON */}
          <button
            onClick={() => handleOrder(paymentMethod)}
            className="btn w-100"
            style={{ backgroundColor: "#60580C", color: "white" }}
          >
            Place Order
          </button>

        </div>
      </div>
    </div>
  );
};

export default PaymentSection;