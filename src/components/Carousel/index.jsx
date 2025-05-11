import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 3,
    autoplay: true,
    className: "",
    arrows: false,
  };
  const imageData = [
    {
      id: 1,
      src: "https://study.com/cimages/multimages/16/adobestock_133450340.jpeg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam porta euismod pretium. Suspendisse a magna ac mi .",
    },
    {
      id: 2,
      src: "",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam porta euismod pretium. Suspendisse a magna ac mi .",
    },
    {
      id: 3,
      src: "",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam porta euismod pretium. Suspendisse a magna ac mi .",
    },
  ];
  return (
    <>
      <div className="mt-5 w-[70%]">
        <Slider {...settings}>
          {imageData.map((data, index) => {
            return (
              <div key={index}>
                <h3 className="text-white mb-4">{data.text}</h3>
                <img className="w-[300px] h-[250px] lg:w-[400px] lg:h-[350px] mx-auto rounded-3xl mt-10" src={data.src} alt="" />
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
};

export default Carousel;
