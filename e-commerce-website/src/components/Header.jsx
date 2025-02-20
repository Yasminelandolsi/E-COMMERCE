import React, { useState, useEffect } from "react";
import { fetchAllProducts } from "../services/api";
import { useNavigate, useLocation } from "react-router-dom";
import "../assets/css/bootstrap.min.css";
import "../assets/css/responsive.css";
import "../assets/css/style.css";
import logo from '../assets/img/logo.png'; 

const Header = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetchAllProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    if (query) {
      const results = products.filter((product) =>
        product.name.toLowerCase().startsWith(query.toLowerCase())
      );
      setFilteredProducts(results.slice(0, 10)); // Limit to 10 results
    } else {
      setFilteredProducts([]);
    }
  }, [query, products]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearchClick = () => {
    if (query) {
      const results = products.filter((product) =>
        product.name.toLowerCase().startsWith(query.toLowerCase())
      );
      setFilteredProducts(results.slice(0, 10)); // Limit to 10 results
    } else {
      setFilteredProducts([]);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <header className="site-branding-area">
      <div className="container">
        <div className="row">
          {/* Logo Section */}
          <div className="col-sm-4">
            <div className="logo" style={{ width: "100px", height: "100px" }}>
              <h1>
                <img src={logo} alt="Logo" />
              </h1>
            </div>
          </div>
          {/* Conditionally Render Search Bar Section */}
          {location.pathname !== "/checkout" && (
            <div className="col-sm-4">
              <input
                type="text"
                style={{ marginTop: "30px" }}
                placeholder="Search products..."
                value={query}
                onChange={handleInputChange}
              />
              <input type="button" value="Search" onClick={handleSearchClick} />
              {filteredProducts.length > 0 && (
                <ul className="search-results" style={{ maxHeight: "200px", overflowY: "auto", marginTop: "10px", padding: "0", listStyleType: "none", border: "1px solid #ccc", borderRadius: "4px" }}>
                  {filteredProducts.map((product) => (
                    <li key={product.id} onClick={() => handleProductClick(product.id)} style={{ padding: "10px", cursor: "pointer", borderBottom: "1px solid #ccc" }}>
                      {product.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
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