import CardTag from "@/components/CardTag";
import { addToCart } from "@/apis/cart";
import React from "react";
import { AiFillStar } from "react-icons/ai";

import { Link } from "react-router-dom";
import { convertSecondsToDaysOrWeeks } from "../../../apis/courses";

const EnrollNowCard = ({
  title,
  image,
  description,
  duration,
  _id,
  price,
  overall_rating,
  category,
  reviews,
  contentLength,
  skill,
  trainer,
}) => {
  const handleCart = () => {
    addToCart({
      title,
      image,
      description,
      duration,
      _id,
      price,
      overall_rating,
      category,
    });
    window.location.href = "/cart";
  };

  return (
    <Link to={`/course/${_id}`} className="lg:pl-3">
      <div className="lg:m-3 mb-5 lg:mb-0 ">
        <div className="w-auto h-auto lg:w-[500px] lg:h-[450px] bg-[#fdfdfd] rounded-[20px] shadow-lg overflow-hidden p-6">
          {/* CARD HEADER SECTION */}
          <div className="flex flex-col lg:flex-row gap-3 mb-2">
            <img
              className="h-[150px]  lg:w-[157px] lg:h-[170px] rounded-2xl object-cover"
              src={image}
              alt="cardImage"
            />
            <div className="flex flex-col justify-start">
              <h5 className="mb-2 text-xl font-semibold text-black line-clamp-2">
                {title}
              </h5>

              {/* CARD TAGS */}
              <div className="flex flex-wrap mb-2">
                <CardTag
                  bg="bg-[#BFFC90]"
                  title={category?.replace("_", " ")}
                />
                <CardTag bg="bg-[#FFDBC7]" title={skill} />
              </div>
              <p className="text-sm text-gray-500">
                {trainer?.firstName} {trainer?.lastName}
              </p>
              <p className="text-sm text-gray-500">
                {contentLength} lessons.{" "}
                {convertSecondsToDaysOrWeeks(duration?.val)}
              </p>
            </div>
          </div>
          <p className="text-gray-500  lg:text-xl mb-4 font-light leading-7 line-clamp-3">
            {description?.short}
          </p>

          <div className="flex items-center space-y-8 mb-3 ">
            <div className="flex items-center">
              <p className="font-normal text-xl mr-2">{overall_rating}</p>
              {new Array(5).fill(0).map((_, i) => (
                <AiFillStar
                  key={i}
                  size={20}
                  className={`${
                    i < overall_rating ? "text-[#FFC107]" : "text-[#B4B4B4]"
                  }`}
                />
              ))}
              <p className="font-normal text-xl text-gray-400 ml-2">
                ({reviews?.length})
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row  justify-between lg:items-center mt-5 ">
            <div className="flex">
              <p className="text-2xl font-medium text-black">
                Price - {price?.symbol ? price?.symbol : "$"}
                {price?.amt}
              </p>
              <p className="text-2xl font-normal text-gray-400 ml-5 line-through">
                {price?.symbol ? price?.symbol : "$"}
                {price.amt + price.amt * 0.01}
              </p>
            </div>

            <button
              onClick={handleCart}
              className="bg-blue-700 text-center hover:bg-blue-600 text-white text-lg px-8 py-3 border rounded-full mr-1 mt-4 lg:mt-0"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EnrollNowCard;
