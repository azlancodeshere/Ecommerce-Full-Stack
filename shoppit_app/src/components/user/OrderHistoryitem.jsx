import React from "react";
import styles from "./OrderHistoryitem.module.css";
import { BASE_URL } from "../../api";
import { FormatDate } from "../../FormateDate";

const OrderHistoryItem = ({ item }) => {

  if (!item || !item.items || item.items.length === 0) {
    return null;
  }

  return (
    <>
      {item.items.map((orderItem) => (
        <div className="card-body" key={orderItem.id}>
          <div className={`order_item mb-3 ${styles.orderItem}`}>
            <div className="row">

              {/* Image */}
              <div className="col-md-2">
                <img
                  src={orderItem.product.image}
                  alt=""
                  className="img-fluid"
                />
              </div>

              {/* Details */}
              <div className="col-md-6">
                <h6>{orderItem.product.name}</h6>
                <p>Order Date: {FormatDate(item.created_at)}</p>
                <p>Order ID: {item.id}</p>
              </div>

              {/* Quantity */}
              <div className="col-md-2 text-center">
                Quantity: {orderItem.quantity}
              </div>

              {/* Price */}
              <div className="col-md-2 text-center">
                ₹{orderItem.price}
              </div>

            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default OrderHistoryItem;