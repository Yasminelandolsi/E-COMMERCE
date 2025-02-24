import React, { useCallback, useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateItem, updateOrderTotal } from "../redux/cartSlice";
import { useNavigate } from 'react-router-dom';
import "../assets/css/bootstrap.min.css";
import "../assets/css/responsive.css";
import "../assets/css/style.css";
import img1 from "../assets/img/product-2.jpg";
import img2 from "../assets/img/product-4.jpg";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart || { items: [] });
  const navigate = useNavigate(); 
  const handleRemove = useCallback((itemId) => {
    dispatch(removeItem(itemId));
  }, [dispatch]);

  const handleQuantityChange = useCallback((itemId, newQuantity) => {
    if (newQuantity < 1) return;
    const item = cart.items.find((item) => item.id === itemId);
    if (item) {
      dispatch(updateItem({ ...item, quantity: newQuantity }));
    }
  }, [dispatch, cart.items]);

  const getImagePath = useCallback((itemName) => {
    if (!itemName) return null;
    try {
      const brand = itemName.split(" ")[0].toLowerCase();
      const imageName = itemName.toLowerCase().replace(/\s+/g, "-") + ".jpg";
      return require(`../assets/products-img/${brand}/${imageName}`);
    } catch (error) {
      console.error(`Image not found for: ${itemName}`);
      return null;
    }
  }, []);

  const cartSubtotal = cart.items.reduce((acc, item) => acc + (parseFloat(item.price) || 0) * (parseInt(item.quantity, 10) || 0), 0);
  const tax = cartSubtotal * 0.20;
  const orderTotal = cartSubtotal + tax;
  useEffect(() => {
    dispatch(updateOrderTotal(orderTotal || 0));
  }, [orderTotal, dispatch]);


  return (
    <div className="single-product-area">
      <div className="zigzag-bottom"></div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="product-content-right">
              <div className="woocommerce">
                <table className="shop_table cart" cellSpacing="0">
                  <thead>
                    <tr>
                      <th className="product-remove">&nbsp;</th>
                      <th className="product-thumbnail">&nbsp;</th>
                      <th className="product-name">Product</th>
                      <th className="product-price">Price</th>
                      <th className="product-quantity">Quantity</th>
                      <th className="product-subtotal">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.items.length > 0 ? (
                      cart.items.map((item) => {
                        // Ensure price and quantity are valid numbers
                        const price = parseFloat(item.price) || 0;
                        const quantity = parseInt(item.quantity, 10) || 0;
                        const total = price * quantity;

                        return (
                          <tr key={item.id} className="cart_item">
                            <td className="product-remove">
                              <a
                                title="Remove this item"
                                className="remove"
                                onClick={() => handleRemove(item.id)}
                              >
                                ×
                              </a>
                            </td>
                            <td className="product-thumbnail">
                              {getImagePath(item.name) ? (
                                <a href="single-product.html">
                                  <img
                                    width="145"
                                    height="145"
                                    src={getImagePath(item.name)}
                                    alt={item.name}
                                    className="shop_thumbnail"
                                  />
                                </a>
                              ) : (
                                <span>Image not available</span>
                              )}
                            </td>
                            <td className="product-name">
                              <a href="single-product.html">{item.name}</a>
                            </td>
                            <td className="product-price">
                              <span className="amount">{price.toFixed(2)}€</span>
                            </td>
                            <td className="product-quantity">
                              <div className="quantity buttons_added">
                                <input
                                  type="button"
                                  className="minus"
                                  value="-"
                                  onClick={() =>
                                    handleQuantityChange(item.id, quantity - 1)
                                  }
                                />
                                <input
                                  type="number"
                                  size="4"
                                  className="input-text qty text"
                                  title="Qty"
                                  value={quantity}
                                  min="0"
                                  step="1"
                                  readOnly
                                />
                                <input
                                  type="button"
                                  className="plus"
                                  value="+"
                                  onClick={() =>
                                    handleQuantityChange(item.id, quantity + 1)
                                  }
                                />
                              </div>
                            </td>
                            <td className="product-subtotal">
                              <span className="amount">{total.toFixed(2)}€</span>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          Your cart is currently empty.
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td className="actions" colSpan="6">
                        <input
                          type="button"
                          onClick={() => navigate('/checkout')}
                          value="Checkout"
                          name="proceed"
                          className="checkout-button button alt wc-forward"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="cart-collaterals">
                  <div className="cross-sells">
                    <h2>You may be interested in...</h2>
                    <ul className="products">
                      <li className="product">
                        <a href="single-product.html">
                          <img width="325" height="325" alt="T_4_front" className="attachment-shop_catalog wp-post-image" src={img1} />
                          <h3>Ship Your Idea</h3>
                          <span className="price"><span className="amount">20.00 €</span></span>
                        </a>
                        <a className="add_to_cart_button" data-quantity="1" data-product_sku="" data-product_id="22" rel="nofollow" href="single-product.html">Add to Cart</a>
                      </li>
                      <li className="product">
                        <a href="single-product.html">
                          <img width="325" height="325" alt="T_4_front" className="attachment-shop_catalog wp-post-image" src={img2}/>
                          <h3>Ship Your Idea</h3>
                          <span className="price"><span className="amount">20.00 €</span></span>
                        </a>
                        <a className="add_to_cart_button" data-quantity="1" data-product_sku="" data-product_id="22" rel="nofollow" href="single-product.html">Add to Cart</a>
                      </li>
                    </ul>
                  </div>

                  <div className="cart_totals">
                    <h2>Cart Totals</h2>
                    <table cellSpacing="0">
                      <tbody>
                        <tr className="cart-subtotal">
                          <th>Cart Subtotal</th>
                          <td><span className="amount">{cartSubtotal.toFixed(2)} €</span></td>
                        </tr>
                        <tr className="shipping">
                          <th>Taxe (20%)</th>
                          <td>{tax.toFixed(2)} €</td>
                        </tr>
                        <tr className="order-total">
                          <th>Order Total</th>
                          <td><strong><span className="amount">{orderTotal.toFixed(2)} €</span></strong></td>
                        </tr>
                      </tbody>
                    </table>
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

export default Cart;