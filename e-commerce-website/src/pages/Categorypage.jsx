import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination"; // Import the Pagination component
import "../assets/css/bootstrap.min.css";
import "../assets/css/responsive.css";
import "../assets/css/style.css";

const CategoryPage = () => {
  const { productListId } = useParams(); // Retrieve productListId from URL parameters
  const { products, loading, error, loadProducts } = useProductContext();
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    console.log("useEffect triggered with productListId:", productListId);
    if (productListId) {
      loadProducts(productListId).then(data => {
        if (data && data.name) {
          setCategoryName(data.name);
        }
      });
    }
  }, [productListId, loadProducts]);

  return (
    <div>
      <div className="product-big-title-area">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="product-bit-title text-center">
                <h2>{categoryName}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="single-product-area">
        <div className="zigzag-bottom"></div>
        <div className="container">
          {loading ? (
            <p>Loading products...</p>
          ) : error ? (
            <p>Error loading products: {error.message}</p>
          ) : (
            <>
            <ProductList products={products} brand={categoryName} />
            <Pagination /> {/* Use the Pagination component */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;