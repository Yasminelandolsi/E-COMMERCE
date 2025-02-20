import React from "react";
import "../assets/css/bootstrap.min.css";
import "../assets/css/responsive.css";
import "../assets/css/style.css";

const ProductList = ({ products, brand }) => {
  const lowerCaseBrand = brand.toLowerCase(); // Convert brand to lowercase

  return (
    <div className="row">
      {products.length > 0 ? (
        products.map((product) => {
          let imagePath;
          try {
            imagePath = require(`../assets/products-img/${lowerCaseBrand}/${product.image}`);
          } catch (error) {
            console.error("Error loading image:", error);
            imagePath = ""; // Fallback to an empty string or a placeholder image
          }
          console.log("Image path:", imagePath); // Log the image path for debugging purposes

          return (
            <div key={product.id} className="col-md-3 col-sm-6">
              <div className="single-shop-product">
                <div className="product-upper">
                  <img src={imagePath} alt={product.name} />
                </div>
                <h2>
                  <a href={`/product/${product.id}`}>{product.name}</a>
                </h2>
                <div className="product-carousel-price">
                  <ins>${product.price}</ins>
                </div>
                <div className="product-option-shop">
                  <a
                    className="add_to_cart_button"
                    data-quantity="1"
                    data-product_sku=""
                    data-product_id={product.id}
                    rel="nofollow"
                    href={`/cart/add/${product.id}`}
                  >
                    Add to cart
                  </a>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default ProductList;