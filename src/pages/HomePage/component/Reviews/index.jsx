import React from "react";
import reviewImg from "../../../../assets/Home/review.png";

const card = [
  {
    heading: "Sushant Singh",
    text: "Sailor helps you with granular cost visibility to the extent of account/business unit and application level.",
  },

  {
    heading: "Sushant Singh",
    text: "Sailor helps you with granular cost visibility to the extent of account/business unit and application level.",
  },
];

const colors = ["#4D5EDC", "#CDD1F2", "#E4DDFE"];

const Review = () => {
  return (
    <div className="mx-6 lg:mx-16 mb-10 mt-10">
      <p className="text-[32px] font-semibold">
        What Our <br /> Students Say ?
      </p>
      <p className="text-xl text-text-custom-color mt-5">
        Choose your online tutor and start learning <br />
        anytime anywhere
      </p>
      <div className="flex flex-col lg:flex-row  lg:space-x-12 mt-5 ">
        <ExpendedCard1 />
        {card.map((item, index) => (
          <Card
            key={index}
            heading={item.heading}
            text={item.text}
            index={index}
            color="#bec3eb"
          />
        ))}
        {/* <Card /> */}
      </div>
    </div>
  );
};

export default Review;

const ExpendedCard1 = () => {
  return (
    <div
      className={`bg-[${colors[0]}] rounded-3xl h-56 w-auto lg:w-[37%] px-8 flex   justify-center items-center`}
    >
      <div>
        <div className="flex flex-col ">
          <p className="text-white semibold text-[24px]">01</p>
          <p className="text-white font-[600] lg:text-[40px]  text-[26px]">
            Sushant Singh
          </p>
        </div>
        <div>
          <p className="text-white mt-3 ">
            Sailor helps you with granular cost visibility to the extent of
            account/business unit and application level.
          </p>
        </div>
      </div>
      <img
        src={reviewImg}
        className="text-white h-24 w-24 mb-6 rounded-full"
        alt=""
      />
    </div>
  );
};

const Card = ({ heading, text, index, color }) => {
  return (
    <div
      className={`bg-violet-${
        index + 2
      }00 bg-gray-200  rounded-3xl h-56 w-auto mt-10 lg:mt-0 lg:w-[28%] px-8 flex flex-col justify-center`}
    >
      <p className=" semibold text-[24px]">0{index + 2}</p>
      <div className="flex flex-row items-center">
        {/* <img src={card2} className=" h-10 w-10" alt="" /> */}
        <p className=" font-semibold text-[24px]">{heading}</p>
      </div>
      <div>
        <p className=" mt-3">{text}</p>
      </div>
    </div>
  );
};
