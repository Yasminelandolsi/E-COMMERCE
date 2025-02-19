import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";
import ProductList from "../components/ProductList";

const CategoryPage = () => {
  const { productListId } = useParams(); // Retrieve productListId from URL parameters
  const { products, loading, error, loadProducts } = useProductContext();

  useEffect(() => {
    console.log("useEffect triggered with productListId:", productListId);
    if (productListId) {
      loadProducts(productListId); // Load products based on productListId
    }
  }, [productListId, loadProducts]);

  return (
    <div className="container">
      <h2>Products for Product List ID: {productListId}</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p>Error loading products: {error.message}</p>
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
};

export default CategoryPage;