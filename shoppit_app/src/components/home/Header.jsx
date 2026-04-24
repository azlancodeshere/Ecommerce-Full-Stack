import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header
      className="py-5"
      style={{ backgroundColor: "#6050DC" }}
    >
      <div className="container px-4 px-lg-5 my-5">
        
        <div className="text-center text-white">
          
          {/* Title */}
          <h1 className="display-4 fw-bold">
            Welcome to Your Favorite Store
          </h1>

          {/* Subtitle */}
          <p className="lead fw-normal text-white-75 mb-4">
            Discover the latest trends with amazing deals
          </p>

          {/* Button */}
          <Link
            to="/shop"
            className="btn btn-light btn-lg rounded-pill px-4 py-2"
            onClick={() => setTimeout(() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }), 100)}
          >
            Shop Now
          </Link>

        </div>

      </div>
    </header>
  );
};

export default Header;