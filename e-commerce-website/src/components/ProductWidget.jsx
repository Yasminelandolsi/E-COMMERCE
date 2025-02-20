import React, { useState, useEffect } from "react";
import { fetchTopSellers, fetchNewArrivals } from "../services/api.js";
import { useCookies } from "react-cookie";
import "../assets/css/bootstrap.min.css";
import "../assets/css/responsive.css";
import "../assets/css/style.css";

const ProductWidget = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [cookies, setCookie] = useCookies(["recentlyViewed"]);

  useEffect(() => {
    // Fetch top sellers
    fetchTopSellers().then((response) => setTopSellers(response.data));

    // Fetch new arrivals
    fetchNewArrivals().then((response) => setNewArrivals(response.data));

    // Get recently viewed products from cookies
    const viewedProducts = cookies.recentlyViewed || [];
    setRecentlyViewed(viewedProducts);
  }, [cookies]);

  const handleViewAll = (listType) => {
    // Logic to fetch and display all products
    if (listType === "topSellers") {
      // Handle fetching full list of top sellers
      fetchTopSellers().then((response) => {
        setTopSellers(response.data);
        // Logic to display the full list of top sellers
      });
    } else if (listType === "recentlyViewed") {
      // Handle fetching full list of recently viewed products
      const viewedProducts = cookies.recentlyViewed || [];
      setRecentlyViewed(viewedProducts);
    } else if (listType === "newArrivals") {
      // Handle fetching full list of new arrivals
      fetchNewArrivals().then((response) => {
        setNewArrivals(response.data);
      });
    }
  };

  return (
    <div className="product-widget-area">
      <div className="zigzag-bottom"></div>
      <div className="container">
        <div className="row">
          {/* Top Sellers Section */}
          <div className="col-md-4">
            <div className="single-product-widget">
              <h2 className="product-wid-title">Top Sellers</h2>
              <a href="#" className="wid-view-more" onClick={() => handleViewAll("topSellers")}>
                View All
              </a>
              {topSellers.slice(0, 3).map((product) => {
                const brand = product.imageName.split('-')[0].toLowerCase();
                const imagePath = require(`../assets/products-img/${brand}/${product.imageName}`);
                return (
                  <div key={product.id} className="single-wid-product">
                    <a href={`single-product.html?id=${product.id}`}>
                      <img src={imagePath} alt={product.name} className="product-thumb" />
                    </a>
                    <h2>
                      <a href={`single-product.html?id=${product.id}`}>{product.name}</a>
                    </h2>
                    <div className="product-wid-rating">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fa fa-star"></i>
                      ))}
                    </div>
                    <div className="product-wid-price">
                      <ins>${product.price}</ins>
                      <del>${product.oldPrice}</del>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recently Viewed Section */}
          <div className="col-md-4">
            <div className="single-product-widget">
              <h2 className="product-wid-title">Recently Viewed</h2>
              <a href="#" className="wid-view-more" onClick={() => handleViewAll("recentlyViewed")}>
                View All
              </a>
              {recentlyViewed.slice(0, 3).map((product) => (
                <div key={product.id} className="single-wid-product">
                  <a href={`single-product.html?id=${product.id}`}>
                    <img src={product.image} alt={product.name} className="product-thumb" />
                  </a>
                  <h2>
                    <a href={`single-product.html?id=${product.id}`}>{product.name}</a>
                  </h2>
                  <div className="product-wid-rating">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fa fa-star"></i>
                    ))}
                  </div>
                  <div className="product-wid-price">
                    <ins>${product.price}</ins>
                    <del>${product.oldPrice}</del>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* New Arrivals Section */}
          <div className="col-md-4">
            <div className="single-product-widget">
              <h2 className="product-wid-title">Top New</h2>
              <a href="#" className="wid-view-more" onClick={() => handleViewAll("newArrivals")}>
                View All
              </a>
              {newArrivals.slice(0, 3).map((product) => {
                const brand = product.imageName.split('-')[0].toLowerCase();
                const imagePath = require(`../assets/products-img/${brand}/${product.imageName}`);
                return (
                  <div key={product.id} className="single-wid-product">
                    <a href={`single-product.html?id=${product.id}`}>
                      <img src={imagePath} alt={product.name} className="product-thumb" />
                    </a>
                    <h2>
                      <a href={`single-product.html?id=${product.id}`}>{product.name}</a>
                    </h2>
                    <div className="product-wid-rating">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fa fa-star"></i>
                      ))}
                    </div>
                    <div className="product-wid-price">
                      <ins>${product.price}</ins>
                      <del>${product.oldPrice}</del>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductWidget;