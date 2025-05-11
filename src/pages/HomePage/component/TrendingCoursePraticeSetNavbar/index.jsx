import React from "react";
import { Link } from "react-router-dom";

const TrendingCourseNavbar = ({ categories, handleCategory }) => {
  const style =
    "mx-3 text-gray-500 font-semibold capitalize cursor-pointer hover:text-black";
  return (
    <div
      className={`${categories.length > 2 ? "block" : "hidden"} mx-7 lg:mx-0`}
    >
      <div className="hidden lg:flex ">
        <ul className="text-[16px] flex mt-10">
          {categories.map((category) => (
            <li
              key={category}
              onClick={() => {
                handleCategory(category);
              }}
              className={style}
            >
              {category.replace("_", " ")}
            </li>
          ))}
        </ul>
      </div>

      <ul
        className={`text-[16px] mt-10 lg:hidden items-center justify-center overflow-x ${
          categories.length > 3 ? "grid grid-cols-4 gap-y-2" : "flex"
        }`}
      >
        {categories.map((category) => (
          <li
            key={category}
            onClick={() => {
              handleCategory(category);
            }}
            className={style}
          >
            {category.replace("_", " ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingCourseNavbar;
