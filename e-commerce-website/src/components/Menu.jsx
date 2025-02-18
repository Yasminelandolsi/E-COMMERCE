import React from "react";
import { NavLink } from "react-router-dom";
import "../assets/css/bootstrap.min.css";
import "../assets/css/responsive.css";
import "../assets/css/style.css";

const Menu = () => {
  return (
    <div className="mainmenu-area">
      <div className="container">
        <div className="row">
          <nav className="navbar">
            <ul className="nav navbar-nav navbar-expand">
              <li className="active">
                <NavLink to="/" className="hover:text-gray-300">Home</NavLink>
              </li>
              <li><NavLink to="/shop/samsung" className="hover:text-gray-300">Samsung</NavLink></li>
              <li><NavLink to="/shop/apple" className="hover:text-gray-300">Apple</NavLink></li>
              <li><NavLink to="/shop/lg" className="hover:text-gray-300">LG</NavLink></li>
              <li><NavLink to="/shop/sony" className="hover:text-gray-300">Sony</NavLink></li>
              <li><NavLink to="/shop/huawei" className="hover:text-gray-300">Huawei</NavLink></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Menu;
