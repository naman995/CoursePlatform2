import React, { useState } from "react";
import CardTag from "@/components/CardTag";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import { RxTrash } from "react-icons/rx";
import { addToWishlist } from "@/apis/wishlist";
import { convertSecondsToDaysOrWeeks } from "../../../apis/courses";

export default function CartItem({
  title,
  image,
  duration,
  _id,
  price,
  category,
  content,
  discount,
  handleRemove,
  paymentMethod,
  dollarRate,
}) {
  const [favroite, setFavroite] = useState(true);
  const handleFavroite = () => {
    setFavroite(!favroite);
    addToWishlist({
      title,
      image,
      duration,
      _id,
      price,
      category,
      content,
      discount,
      handleRemove,
      paymentMethod,
      dollarRate,
    });
  };

  return (
    <div className="bg-white rounded-[20px] max-w-[1600px] p-4 ">
      <div className="flex flex-col justify-between gap-3 lg:flex-row ">
        <div className="flex flex-col lg:flex-row">
          <img
            src={image}
            alt="cardImage"
            className=" w-auto lg:w-[218px] h-[150px] lg:h-56 rounded-2xl object-cover mr-4"
          />

          {/* DETAILS */}
          <div className="flex flex-col sm:space-y-4 lg:space-y-6">
            <h1 className="text-2xl font-semibold">{title}</h1>
            <div className="flex">
              <CardTag bg="bg-[#BFFC90]" title={category} />
            </div>

            <p className="text-xl font-light">
              {content?.length} lesson. {convertSecondsToDaysOrWeeks(duration?.val)}
            </p>

            <div className="flex items-center ">
              <p className="text-2xl font-medium">
                Price - {price.symbol}
                {price.amt}
                <span className="ml-2 text-2xl font-normal text-gray-400 line-through">
                  {price.symbol}
                  {price.amt + price.amt * 0.01}
                </span>
              </p>
              <div className="flex justify-center items-center bg-[#1CB091] p-3 h-6 rounded-full text-center leading-9 text-sm font-semibold text-white ml-3">
                <span>Save 10%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex p-3 mx-auto space-x-2 lg:items-center lg:mr-32 lg:mx-0">
          <button
            onClick={handleFavroite}
            className="h-14 min-w-12 flex items-center space-x-1 ease-in duration-300 hover:text-[#FF2525] px-4 py-2 rounded-full border group hover:bg-[#F3F3F3]"
          >
            {favroite ? (
              <AiOutlineHeart size={26} />
            ) : (
              <AiFillHeart size={26} className="text-[#FF2525]" />
            )}
            <p className="text-base font-light duration-300 ease-in group-hover:block ">
              Add To Wishlist
            </p>
          </button>
          <button
            onClick={handleRemove}
            className="h-14 min-w-12 ease-in duration-300 flex items-center space-x-1 hover:text-[#FF2525] px-4 py-2 rounded-full border group hover:bg-[#F3F3F3]"
          >
            <RxTrash size={26} />
            <p className="text-base font-light duration-300 ease-in group-hover:block ">
              Remove
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
