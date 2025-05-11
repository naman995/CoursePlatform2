import React from "react";
import Arrow from "@/assets/Home/Arrow.png";
import SearchBar from "../SearchBar";
import img1 from '@/assets/Home/herosection-1.png';
import img2 from '@/assets/Home/herosection-2.png';

const HeroSection = () => {
  return (
    <div className="bg-navbar-custom-color px-16 pt-10 pb-20 mb-32 w-full " >
      <div className="flex flex-col lg:flex lg:flex-row justify-between">
        <div className=" mt-5 lg:w-1/2 lg:mt-16">
          <p className=" text-2xl text-center lg:text-left lg:text-[24px] text-button-custom-color font-semibold ">
            Simplifying Learning
          </p>
          <p className=" text-4xl mt-7 lg:text-[60px]  font-semibold lg:text-left text-center ">
            Find The Right{" "}
          </p>
          <p className=" text-4xl lg:text-[60px] lg:mt-7 font-semibold lg:text-left text-center">
            Online Tutor For You
          </p>
          <p className="text-[20px] mt-2 lg:mt-7 text-gray-400 lg:text-left text-center">
            Choose Your Online Tutor And Start Learning Anytime <br />
            Anywhere
          </p>
          <div className="flex mt-5 lg:mt-0 ">
            <SearchBar />
            <img
              src={Arrow}
              className="h-14 ml-2 hidden lg:block "
              alt=""
            />
          </div>
        </div>
        <div className=" lg:p-5 lg:w-1/2   lg:mt-0 relative lg:pl-[10%] mt-10 ml-[1%] mb-[60%] lg:mb-20">
          {/* <img className="w-auto" src={HeroBanner} alt="" /> */}
          <img className=" absolute lg:w-[350px] lg:h-[350px]  w-[250px] h-[250px] z-0" src={img1} alt="" />
          <img className="absolute lg:w-[350px] lg:h-[350px] w-[250px] h-[250px] ml-[20%] mt-[20%] " src={img2} alt="" />
        </div> 
      </div>
    </div>
  );
};

export default HeroSection;
