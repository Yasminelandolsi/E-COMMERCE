import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { fetchCategories } from "../services/api";
import { useProductContext } from "../context/ProductContext";
import "../assets/css/bootstrap.min.css";
import "../assets/css/responsive.css";
import "../assets/css/style.css";

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const { loadProducts } = useProductContext();

  useEffect(() => {
    fetchCategories()
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <div className="mainmenu-area">
      <div className="container">
        <div className="row">
          <div className="navbar">
            <ul className="nav navbar-nav navbar-expand">
              <li className="active">
                <NavLink to="/" className="hover:text-gray-300">Home</NavLink>
              </li>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <li key={category.id}>
                    <NavLink
                      to={`/category/${category.productListId}`}
                      onClick={() => loadProducts(category.productListId)}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
