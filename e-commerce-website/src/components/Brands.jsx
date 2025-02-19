import React from 'react';
import "../assets/css/bootstrap.min.css";
import "../assets/css/responsive.css";
import "../assets/css/style.css";
import brand1 from "../assets/img/brand1.png";
import brand2 from "../assets/img/brand2.png";  
import brand3 from "../assets/img/brand3.png";
import brand4 from "../assets/img/brand4.png";
import brand5 from "../assets/img/brand5.png";
import brand6 from "../assets/img/brand6.png";
const Brands = () => {
  return (
    <div className="brands-area">
      <div className="zigzag-bottom"></div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="brand-wrapper">
              <div className="brand-list">
                <img src={brand1} alt="brand 1" />
                <img src={brand2} alt="brand 2" />
                <img src={brand3} alt="brand 3" />
                <img src={brand4} alt="brand 4" />
                <img src={brand5} alt="brand 5" />
                <img src={brand6} alt="brand 6" />
                <img src={brand1} alt="brand 1 duplicate" />
                <img src={brand2} alt="brand 2 duplicate" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands;
