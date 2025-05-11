import React from "react";
import Carousel from "@/components/Carousel";
import logo from "../../../assets/Home/logowhite.png";

const CarouselSide = () => {
  return (
    <div className=" flex flex-col items-center lg:items-start mt-10 lg:mt-0 lg:w-5/12 border-collapse  lg:border-r-[1px]  lg:border-white ">
      <img className="w-[51px] h-[30px] " src={logo} alt="Company Logo" />
      <p className="font-semibold text-[48px]  text-white ">Cloudlyz</p>
      <Carousel />
    </div>
  );
};

export default CarouselSide;
