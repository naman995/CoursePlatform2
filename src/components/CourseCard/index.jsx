import React from "react";
import { AiTwotoneStar } from "react-icons/ai";
import { Link } from "react-router-dom";

const CourseCard = ({ courses, style }) => {
  return (
    <div className={`${style}`}>
      {courses.map((course) => (
        <Link
          to={`/course/${course._id}`}
          key={course._id}
          className="mt-6 mb-6 "
        >
          <div className="w-[260px] lg:block flex-col items-center ">
            <div className="px-2 pt-2 rounded-xl">
              <img
                className="h-[150px] w-full lg:w-[250px] rounded-xl "
                src={course.image}
                alt=""
              />
            </div>
            <div className="mx-1 lg:mx-3 mt-2 ml-5 lg:ml-0">
              <p className="px-1 text-text-custom-color capitalize lg:mx-0">
                {course.category.replace("_", " ")}
              </p>
              <p className="p-1 text-[18px] font-semibold line-clamp-2 lg:mx-0">
                {course.title}
              </p>
              <div className="flex px-1  items-center  lg:mx-0">
                <p className="font-bold text-[20px] ">
                  {course.price.symbol ? course.price.symbol : "$"}
                  {course.price.amt}
                </p>
                <p className="line-through text-text-custom-color ml-4 text-[13px]  ">
                  {course.price.symbol ? course.price.symbol : "$"}
                  {course.price.amt + course.price.amt * 0.01}
                </p>
              </div>
              <div className="flex  lg:mx-1 text-[12px] mt-3 items-center">
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
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CourseCard;
