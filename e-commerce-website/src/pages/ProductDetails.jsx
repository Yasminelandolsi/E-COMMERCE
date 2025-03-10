import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProductById } from "../services/api";
import { addItem } from "../redux/cartSlice";
import { useCookies } from "react-cookie";
import { useProductContext } from "../context/ProductContext";
import "../assets/css/bootstrap.min.css";
import "../assets/css/responsive.css";
import "../assets/css/style.css";

  const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [error, setError] = useState(null);
  const [cookies, setCookie] = useCookies(["recentlyViewed"]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { categories } = useProductContext();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetchProductById(productId);
        setProduct(response.data);
        const recentlyViewed = cookies.recentlyViewed || [];
        const updatedRecentlyViewed = [response.data, ...recentlyViewed.filter(p => p.id !== response.data.id)].slice(0, 3);
        setCookie("recentlyViewed", updatedRecentlyViewed, { path: "/" });
      } catch (err) {
        setError(err);
      } finally {
        setLoadingProduct(false);
      }
    };
    loadProduct();
  }, [productId, cookies, setCookie]);

  const handleAddToCart = () => {
    dispatch(addItem({ ...product, quantity }));
  };

  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  if (loadingProduct) {
    return <p>Loading product details...</p>;
  }
  if (error) {
    return <p>Error loading product details: {error.message}</p>;
  }
  if (!product) {
    return <p>Product not found.</p>;
  }

  // Derive category from product data.
  // Assume product.category holds the category name. 
  // If not available, use the first part of imageName.
  const categoryLabel = product.category
    ? product.category
    : product.imageName.split('-')[0];
  // Look up the matching category in our context data.
  const categoryData = categories.find(
    (cat) => cat.name.toLowerCase() === categoryLabel.toLowerCase()
  );
  const categoryLink = categoryData ? categoryData.productListId : "default";
  const imageFolder = product.imageName.split('-')[0].toLowerCase();
  const imagePath = require(`../assets/products-img/${imageFolder}/${product.imageName}`);
  const oldPrice = product.price / (1 - product.discountRate / 100);

  return (
    <div className="single-product-area">
      <div className="zigzag-bottom"></div>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="single-sidebar">
              <h2 className="sidebar-title">Recently Viewed</h2>
              {cookies.recentlyViewed &&
                cookies.recentlyViewed.map((recentProduct, index) => (
                  <div key={index} className="thubmnail-recent">
                    <img
                      src={
                        require(`../assets/products-img/${recentProduct.imageName.split('-')[0].toLowerCase()}/${recentProduct.imageName}`)
                      }
                      className="recent-thumb"
                      alt={recentProduct.name}
                    />
                    <h2>
                      <a href={`/product/${recentProduct.id}`}>{recentProduct.name}</a>
                    </h2>
                    <div className="product-sidebar-price">
                      <ins>${recentProduct.price}</ins>{" "}
                      <del>${recentProduct.oldPrice || "N/A"}</del>
                    </div>
                  </div>
                ))}
            </div>
            <div className="single-sidebar">
              <h2 className="sidebar-title">Others brands</h2>
              <ul>
                <li>
                  <a href="#">Sony</a>
                </li>
                <li>
                  <a href="#">Samsung</a>
                </li>
                <li>
                  <a href="#">LG</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-8">
            <div className="product-content-right">
              <div className="product-breadcroumb">
                <Link to="/">Home</Link>
                {categoryData ? (
                  <Link to={`/category/${categoryLink}`}>
                    {categoryData.name}
                  </Link>
                ) : (
                  <span>{categoryLabel}</span>
                )}
                <span>{product.name}</span>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="product-images">
                    <div className="product-main-img">
                      <img src={imagePath} alt={product.name} />
                    </div>
                    <div className="product-gallery">
                      <img src={require("../assets/img/product-thumb-1.jpg")} alt="Product Thumbnail" />
                      <img src={require("../assets/img/product-thumb-2.jpg")} alt="Product Thumbnail" />
                      <img src={require("../assets/img/product-thumb-3.jpg")} alt="Product Thumbnail" />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="product-inner">
                    <h2 className="product-name">{product.name}</h2>
                    <div className="product-inner-price">
                      <ins>${product.price}</ins> <del>${oldPrice.toFixed(2)}</del>
                    </div>
                    <form action="" className="cart">
                      <div className="quantity">
                        <input
                          type="number"
                          size="4"
                          className="input-text qty text"
                          title="Qty"
                          value={quantity}
                          name="quantity"
                          min="1"
                          step="1"
                          onChange={handleQuantityChange}
                        />
                      </div>
                      <button type="button" className="add_to_cart_button" onClick={handleAddToCart}>
                        Add to cart
                      </button>
                    </form>
                    <div className="product-inner-category">
                      <h2>Product Description</h2>
                      <p>{product.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>                    
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;