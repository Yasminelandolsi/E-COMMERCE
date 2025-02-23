import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useProductContext } from "../context/ProductContext";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";
import { addItem } from "../redux/cartSlice";
import "../assets/css/bootstrap.min.css";
import "../assets/css/responsive.css";
import "../assets/css/style.css";

const CategoryPage = () => {
  const { productListId } = useParams();
  const { products, loading, error, loadProducts } = useProductContext();
  const [categoryName, setCategoryName] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (productListId) {
      loadProducts(productListId).then((data) => {
        if (data && data.name) {
          setCategoryName(data.name);
        }
      });
    }
  }, [productListId, loadProducts]);

  const handleAddToCart = (product) => {
    dispatch(addItem({ ...product, quantity: 1 }));
  };

  // Enhance each product with an oldPrice property.
  // If a discountRate exists and is greater than 0, compute the old price.
  // Otherwise, oldPrice is set equal to product.price.
  const productsWithOldPrice = products.map((product) => {
    const computedOldPrice =
      product.discountRate && product.discountRate > 0
        ? product.price / (1 - product.discountRate / 100)
        : product.price;
    return {
      ...product,
      oldPrice: computedOldPrice,
    };
  });

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
              <ProductList
                products={productsWithOldPrice}
                brand={categoryName}
                onAddToCart={handleAddToCart}
              />
              <Pagination />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;