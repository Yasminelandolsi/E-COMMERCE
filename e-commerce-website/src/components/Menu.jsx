import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { fetchCategories } from "../services/api";
import "../assets/css/bootstrap.min.css";
import "../assets/css/responsive.css";
import "../assets/css/style.css";

const Menu = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories()
      .then((response) => {
        setCategories(response.data); // Assuming API returns an array of categories
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <div className="mainmenu-area">
      <div className="container">
        <div className="row">
          <nav className="navbar">
            <ul className="nav navbar-nav navbar-expand">
              <li className="active">
                <NavLink to="/" className="hover:text-gray-300">Home</NavLink>
              </li>
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <li key={index}>
                    <NavLink
                      to={`/shop/${category.name.toLowerCase()}`}
                      className="hover:text-gray-300"
                    >
                      {category.name}
                    </NavLink>
                  </li>
                ))
              ) : (
                <li>Loading categories...</li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Menu;
