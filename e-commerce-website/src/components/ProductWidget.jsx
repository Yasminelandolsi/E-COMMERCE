import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { fetchTopSellers, fetchNewArrivals } from "../services/api";

const ProductWidget = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [cookies] = useCookies(["recentlyViewed"]);

  useEffect(() => {
    const loadTopSellers = async () => {
      try {
        const response = await fetchTopSellers();
        setTopSellers(response.data);
      } catch (error) {
        console.error("Error fetching top sellers:", error);
      }
    };

    const loadNewArrivals = async () => {
      try {
        const response = await fetchNewArrivals();
        setNewArrivals(response.data);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    };

    loadTopSellers();
    loadNewArrivals();
  }, []);

  return (
    <div className="product-widget-area">
      <div className="zigzag-bottom"></div>
      <div className="container">
        <div className="row">
          {/* Top Sellers Section */}
          <div className="col-md-4">
            <div className="single-product-widget">
              <h2 className="product-wid-title">Top Sellers</h2>
              <a href="#" className="wid-view-more">View All</a>
              {topSellers.map((product) => (
                <div key={product.id} className="single-wid-product">
                  <a href={`/product/${product.id}`}>
                    <img src={require(`../assets/products-img/${product.imageName.split('-')[0].toLowerCase()}/${product.imageName}`)} alt={product.name} className="product-thumb" />
                  </a>
                  <h2><a href={`/product/${product.id}`}>{product.name}</a></h2>
                  <div className="product-wid-price">
                    <ins>${product.price}</ins>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recently Viewed Section */}
          <div className="col-md-4">
            <div className="single-product-widget">
              <h2 className="product-wid-title">Recently Viewed</h2>
              <a href="#" className="wid-view-more">View All</a>
              {cookies.recentlyViewed && cookies.recentlyViewed.map((product, index) => (
                <div key={index} className="single-wid-product">
                  <a href={`/product/${product.id}`}>
                    <img src={require(`../assets/products-img/${product.imageName.split('-')[0].toLowerCase()}/${product.imageName}`)} alt={product.name} className="product-thumb" />
                  </a>
                  <h2><a href={`/product/${product.id}`}>{product.name}</a></h2>
                  <div className="product-wid-price">
                    <ins>${product.price}</ins>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* New Arrivals Section */}
          <div className="col-md-4">
            <div className="single-product-widget">
              <h2 className="product-wid-title">New Arrivals</h2>
              <a href="#" className="wid-view-more">View All</a>
              {newArrivals.map((product) => (
                <div key={product.id} className="single-wid-product">
                  <a href={`/product/${product.id}`}>
                    <img src={require(`../assets/products-img/${product.imageName.split('-')[0].toLowerCase()}/${product.imageName}`)} alt={product.name} className="product-thumb" />
                  </a>
                  <h2><a href={`/product/${product.id}`}>{product.name}</a></h2>
                  <div className="product-wid-price">
                    <ins>${product.price}</ins>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductWidget;