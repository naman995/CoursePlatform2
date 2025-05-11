import React from "react";
import { Link } from "react-router-dom";

const OnlineTutor = () => {
  return (
    <div className="bg-gradient max-w-8xl pt-10 lg:flex lg:flex-row text-center lg:text-left lg:items-center justify-between  px-[4%] mx-[5%] rounded-[42px] h-auto pb-10 mb-10 lg:pt-5 mt-10">
      <div className="">
        <p className="text-[40px] font-[500]">
          Find The Right Online <br /> <b className="font-[800]"> Tutor</b> For
          You
        </p>
        <p className="text-[24px] mt-5">
          Choose Your Online Tutor And Start Learning Anytime <br /> Anywhere
        </p>
      </div>
      <div className="flex mt-2 justify-center">
        <Link to="/search">
          <button className="bg-white rounded-[63px] px-10 py-4 font-[500] text-[40px] text-[#000000] ">
            Explore Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OnlineTutor;
