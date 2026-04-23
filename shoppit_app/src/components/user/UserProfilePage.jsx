import React, { useEffect, useState } from "react";
import UserInfo from "./UserInfo";
import OrderHistoryItemContainer from "./OrderHistoryItemContainer";
import api from "../../api"

const UserProfilePage = () => {

  const [userInfo, setUserInfo] = useState({})
  const [orderitems, setOrderitems] = useState([])
  const [loading , setLoading]= useState(false)

  useEffect(() => {
  setLoading(true);

  const token = localStorage.getItem("access");

  
  api.get("/api/user_info/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(res => {
    setUserInfo(res.data);
  })
  .catch(err => console.log(err));

  
  api.get("/api/orders/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(res => {
    console.log("ORDERS:", res.data); 
    setOrderitems(res.data);
    setLoading(false);
  })
  .catch(err => {
    console.log(err);
    setLoading(false);
  });

}, []);

  return (
    <div className="container my-5">

      {/* Profile Header */}
      <UserInfo  userInfo={userInfo}/>

      {/* Order History */}
      <OrderHistoryItemContainer orderitems={orderitems}/>

    </div>

  );
};

export default UserProfilePage;

