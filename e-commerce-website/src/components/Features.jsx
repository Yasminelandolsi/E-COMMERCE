import React from "react";
import "../assets/css/bootstrap.min.css";
import "../assets/css/responsive.css";
import "../assets/css/style.css";
const Features = () => {
  const features = [
    { icon: "fa-refresh", text: "30 Days return" },
    { icon: "fa-truck", text: "Free shipping" },
    { icon: "fa-lock", text: "Secure payments" },
    { icon: "fa-gift", text: "New products" },
  ];

  return (
    <div className="promo-area">
      <div className="zigzag-bottom"></div>
      <div className="container">
        <div className="row">
          {features.map((feature, index) => (
            <div key={index} className="col-md-3 col-sm-6">
              <div className={`single-promo promo${index + 1}`}>
                <i className={`fa ${feature.icon}`}></i>
                <p>{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
