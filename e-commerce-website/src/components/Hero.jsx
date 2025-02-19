import React from "react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 
import pic1 from '../assets/img/h4-slide.png'; 
import pic2 from '../assets/img/h4-slide2.png'; 
import pic3 from '../assets/img/h4-slide3.png'; 

const Hero = () => {
  return (
    <Carousel 
      showArrows={true} 
      infiniteLoop={true} 
      autoPlay={true} 
      interval={3000} 
      showThumbs={false}
    >
      <div>
        <img src={pic1} alt="First slide" />
      </div>
      <div>
        <img src={pic2} alt="Second slide" />
      </div>
      <div>
        <img src={pic3} alt="Third slide" />
      </div>
    </Carousel>
  );
};

export default Hero;
