import React from "react";
import "../assets/css/bootstrap.min.css";
import "../assets/css/responsive.css";
import "../assets/css/style.css";
import logo from '../assets/img/logo.png'; 
const Header = () => {
  return (
    <header className="site-branding-area">
      <div className="container">
        <div className="row">
          {/* Logo Section */}
          <div className="col-sm-4">
            <div className="logo" style={{ width: "100px", height: "100px" }}>
              <h1>
                <a href="index.html">
                  <img src={logo} alt="Logo" />
                </a>
              </h1>
            </div>
          </div>
          {/* Search Bar Section */}
          <div className="col-sm-4">
            <input
              type="text"
              style={{ marginTop: "30px" }}
              placeholder="Search products..."
            />
            <button>Search</button>
          </div>
          {/* Shopping Cart Section */}
          <div className="col-sm-4">
            <div className="shopping-item">
              <a href="cart.html">
                Cart: <span className="cart-amunt">100.58 €</span>
                <i className="fa fa-shopping-cart"></i>
                <span className="product-count">5</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
