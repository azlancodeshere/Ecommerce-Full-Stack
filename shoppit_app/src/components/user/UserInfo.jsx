import React from 'react'
import style from "./Userinfo.module.css"

const UserInfo = ({userInfo}) => {
  return (
    <div className="row mb-4">
      <div className={`col-md-3 py-3 card ${style.textCenter}`}>
       <img
             src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
             alt="User Profile"
               className={`img-fluid rounded-circle mb-3 mx-auto ${style.profileImage}`}
              />
        <h4> {userInfo.first_name || userInfo.last_name
                        ? `${userInfo.first_name} ${userInfo.last_name}`
                         : userInfo.username}
            </h4> 
        <p className="text-muted">{userInfo.email}</p>
        <button
          className="btn mt-2"
          style={{ backgroundColor: "#6050DC", color: "white" }}
        >
          Edit Profile
        </button>
      </div>

      <div className="col-md-9">
        <div className="card">
          <div
            className="card-header"
            style={{ backgroundColor: "#6050DC", color: "white" }}
          >
            <h5>Account Overview</h5>
          </div>

          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <p>
                    <strong>Full Name:</strong>{" "}
                          {userInfo.first_name || userInfo.last_name
                        ? `${userInfo.first_name} ${userInfo.last_name}`
                         : userInfo.username}
                </p>
                <p>
                    <strong>email:</strong>{userInfo.email}
                </p>

                <p>
                    <strong>Phone:</strong>{userInfo.phone}
                </p>
              </div>
              <div>
                <p>
                   <strong>City:</strong> {userInfo.city}
                  </p>

                     <p>
                         <strong>State:</strong> {userInfo.state}
                    </p>

                   
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo