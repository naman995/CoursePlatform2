import React from "react";
import { HiOutlineCreditCard } from "react-icons/hi";
import card from "@/assets/Home/card.svg";
import card2 from "@/assets/Home/card2.png";

const OurServices = () => {
  const sun = "https://www.w3schools.com/html/mov_bbb.mp4";
  return (
    <div className=" mx-6 lg:mx-16 ">
      <p className="text-[32px] font-semibold">Avail Our Services</p>
      <p className="text-[#808080] text-xl">
        Choose your online tutor and start learning anytime <br /> anywhere
      </p>
      <div className="flex flex-col lg:flex-row mt-5 justify-between ">
        <ExpendedCard1 />
        <Card
          heading="Mock Interview Round"
          text="Choose your online tutor and start learning anytime anywhere"
        />
        <Card
          heading="Your CV Generation"
          text="Choose your online tutor and start learning anytime anywhere"
        />
      </div>
      <div className="mt-20 flex flex-col lg:flex-row justify-between">
        <div className="w-auto lg:w-[40%]">
          <p className="text-[44px] font-[700]">
            We do everything to <br /> Succeed you in Life
          </p>
          <p className="mt-5 text-[#7D7D7D] text-[20px] font-[400]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            fermentum ornare risus in pulvinar. Donec finibus risus sem, in
            aliquam leo lobortis sed. In pretium elit dolor, et ultricies urna
            imperdiet view more
          </p>
        </div>
        <div>
          <video
            controls="controls"
            src={sun}
            className="object-cover h-[250px] w-[400px] lg:h-[400px] lg:w-[700px] rounded-[15px] lg:rounded-[40px] mt-10 lg:mt-0"
          ></video>
        </div>
      </div>
    </div>
  );
};

export default OurServices;

const ExpendedCard1 = () => {
  return (
    <div className="bg-black rounded-3xl h-56 lg:w-[35%] w-auto px-8  flex flex-col justify-center">
      <div className="flex flex-row items-center">
        <img src={card} className="text-white h-10 w-10" alt="" />
        <p className="text-white font-semibold text-[24px] ml-4">
          Your Cv <br /> Generation
        </p>
      </div>
      <div>
        <p className="text-white mt-3">
          Sailor helps you with granular cost visibility to the extent <br /> of
          account/business unit and application level.
        </p>
      </div>
    </div>
  );
};

const Card = ({ heading, text }) => {
  return (
    <div className="bg-[#f2f2f2]  rounded-3xl h-56 lg:w-[28%] w-auto mt-10 lg:mt-0 px-8 flex flex-col justify-center">
      <div className="flex flex-row items-center">
        <img src={card2} className=" h-10 w-10" alt="" />
        <p className=" font-semibold text-[24px] ml-4">{heading}</p>
      </div>
      <div>
        <p className=" mt-3">{text}</p>
      </div>
    </div>
  );
};
