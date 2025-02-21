import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProductById } from "../services/api";
import { addItem } from "../redux/cartSlice";
import { useCookies } from "react-cookie";
import "../assets/css/bootstrap.min.css";
import "../assets/css/responsive.css";
import "../assets/css/style.css";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cookies, setCookie] = useCookies(["recentlyViewed"]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetchProductById(productId);
        setProduct(response.data);

        const recentlyViewed = cookies.recentlyViewed || [];
        const updatedRecentlyViewed = [response.data, ...recentlyViewed.filter(p => p.id !== response.data.id)].slice(0, 5);
        setCookie("recentlyViewed", updatedRecentlyViewed, { path: "/" });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId, cookies, setCookie]);

  const handleAddToCart = () => {
    dispatch(addItem({ ...product, quantity }));
  };

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return <p>Error loading product details: {error.message}</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  const imagePath = require(`../assets/products-img/${product.imageName.split('-')[0].toLowerCase()}/${product.imageName}`);

  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  const oldPrice = product.price / (1 - product.discountRate / 100);

  return (
    <div className="single-product-area">
      <div className="zigzag-bottom"></div>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="single-sidebar">
              <h2 className="sidebar-title">Recently Viewed</h2>
              {cookies.recentlyViewed && cookies.recentlyViewed.map((recentProduct, index) => (
                <div key={index} className="thubmnail-recent">
                  <img src={require(`../assets/products-img/${recentProduct.imageName.split('-')[0].toLowerCase()}/${recentProduct.imageName}`)} className="recent-thumb" alt={recentProduct.name} />
                  <h2><a href={`/product/${recentProduct.id}`}>{recentProduct.name}</a></h2>
                  <div className="product-sidebar-price">
                    <ins>${recentProduct.price}</ins> <del>${recentProduct.oldPrice || 'N/A'}</del>
                  </div>
                </div>
              ))}
            </div>
            <div className="single-sidebar">
              <h2 className="sidebar-title">Others brands</h2>
              <ul>
                <li><a href="#">Sony</a></li>
                <li><a href="#">Samsung</a></li>
                <li><a href="#">LG</a></li>
              </ul>
            </div>
          </div>
          <div className="col-md-8">
            <div className="product-content-right">
              <div className="product-breadcroumb">
                <a href="/">Home</a>
                <a href="#">Category Name</a>
                <a href="#">{product.name}</a>
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
                      <button type="button" className="add_to_cart_button" onClick={handleAddToCart}>Add to cart</button>
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