import React from "react";
import ExploreButton from "./component/ExploreButton";
import { AiOutlineLine } from "react-icons/ai";
import { RxDotFilled } from "react-icons/rx";

const Discount = ({
  text = "50% off Choose your online tutor and start learning anytime anywhere",
}) => {
  return (
    <div className=" bg-yellow-400 py-5 flex flex-col mt-8 lg:flex-row justify-center items-center ">
      <p className="font-[400px] text-[25px] lg:mr-8 text-center lg:text-left">{text}</p>
      <ExploreButton text="Explore Courses" />
      <div>
        <p className=" font-[400px] text-[25px] mt-2 lg:mt-0 lg:ml-10">
          Students On Our Platform
        </p>
      </div>

      <AiOutlineLine size ={30} className="hidden lg:block" />
      <RxDotFilled  size={40} className="hidden lg:block"/>
    </div>
  );
};

export default Discount;
