import React from "react";
import CourseImage from "@/assets/Home/CourseCard.png";
import RatingStar from "@/components/RatingStar";
import { AiTwotoneStar } from "react-icons/ai";
import { Link } from "react-router-dom";

const LiveCourseCard = ({ courses }) => {
  return (
    <>
      {courses.map((course, index) => (
        <Link to={`/course/${course._id}`} key={index} className="mt-10 mb-10">
          <div className="w-[300px] ">
            <div className="px-2 pt-2 rounded-xl flex justify-center ">
              <img
                className="h-[150px] w-[250px] lg:h-[158px] lg:w-[319px] rounded-xl "
                src={course.image}
                alt=""
              />
            </div>
            <div className="mx-1 lg:mt-3 mt-2 ml-5 lg:ml-0">
              <p className="px-1 text-text-custom-color lg:mx-0 capitalize">
                {course.category.replace("_", " ")}
              </p>
              <p className="p-1 text-[18px] font-semibold lg:mx-0 line-clamp-2">
                {course.title}
              </p>
              <div className="flex px-1  items-center lg:mx-0">
                <p className="font-bold text-[20px] ">
                  {course.price.symbol ? course.price.symbol : "$"}
                  {course.price.amt}
                </p>
                <p className="line-through text-text-custom-color ml-4 text-[13px]  ">
                  {course.price.symbol ? course.price.symbol : "$"}
                  {course.price.amt + course.price.amt * 0.01}
                </p>
              </div>
              <div className="flex lg:mx-1 text-[12px] mt-3 items-center">
                {/* {course.overall_rating} */}
                {new Array(5).fill(0).map((_, i) => (
                  <AiTwotoneStar
                    key={i}
                    className={`${
                      i < course.overall_rating
                        ? "text-[#FFC107]"
                        : "text-gray-400"
                    }`}
                  />
                ))}
                <p className="text-text-custom-color ">
                  &nbsp;({course.reviews.length} reviews)
                </p>
              </div>
              <p className="text-green-500 ml-[2px]">
                Starts From {course.date}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default LiveCourseCard;
