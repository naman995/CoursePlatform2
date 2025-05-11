import React from "react";
import { NavLink } from "react-router-dom";
import { AiTwotoneStar } from "react-icons/ai";
import CardTag from "@/components/CardTag";
import { convertSecondsToDaysOrWeeks } from "../../../apis/courses";

/*
<NavLink
        to={`courses/${course.id}`}
        className={({ isActive, isPending }) =>
          isActive ? "active" : isPending ? "pending" : ""
        }
      >
        {course.first || course.last ? (
          <>
            {course.first} {course.last}
          </>
        ) : (
          <i>No Name</i>
        )}
      </NavLink>
*/

function Tags({ course }) {
  return (
    <div className="flex">
      <div className="rounded-full bg-[#BFFC90] px-4 py-1">
        <h3 className="font-semibold text-sm">{course.category}</h3>
      </div>
      <div className="rounded-full bg-[#BFFC90] px-4 py-1">
        <h3 className="font-semibold text-sm">{course.skill}</h3>
      </div>
    </div>
  );
}

function CourseCard({ course }) {
  return (
    <div
      key={course.id}
      className="flex flex-col w-[400px] bg-white shadow p-3 rounded-lg"
    >
      <div className="flex flex-row">
        <img
          src={course.image}
          alt={course.title}
          className="w-[120px] h-[120px] rounded-xl"
        />

        <div className="flex flex-row space-x-4 ml-2">
          <div className="flex flex-col space-y-3">
            <h2 className="font-semibold text-lg ">{course.title}</h2>
            {/* <div className="flex flex-row space-x-1">
              {course.tags?.map((tag) => (
                <Tags  />
              ))}
            </div> */}
            <div className="flex flex-wrap mb-2">
              <CardTag
                bg="bg-[#BFFC90]"
                title={course.category.replace("_", " ")}
              />
              <CardTag bg="bg-[#FFDBC7]" title={course.skill} />
            </div>
            <h2 className="text-[16px]">
              {course.type === "LIVE_TRAINING"
                ? "Live Class"
                : course.content.length +
                  " Lessons • " +
                  convertSecondsToDaysOrWeeks(course.duration.val)}
            </h2>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <p className="text-[16px]">{course.description?.short}</p>
        <div className="text-[20px] flex items-center  space-x-2">
          <span>{course.overall_rating}</span>
          <span className="flex flex-row">
            {new Array(5).fill(0).map((_, i) => (
              <AiTwotoneStar
                key={i}
                className={`${
                  i < course.overall_rating ? "text-[#FFC107]" : "text-gray-400"
                }`}
              />
            ))}
          </span>
          <span className="text-[#A5A5A5]">
            ({course.reviews.length} reviews ){" "}
          </span>
        </div>
        <span className="text-sm">
          {course.students.length} students enrolled
        </span>
        <div className="flex flex-row justify-between space-x-3">
          <div className="flex flex-row space-x-2 items-center">
            <span className={`font-medium text-[20px]`}>
              Price - {course.price.symbol ? course.price.symbol : "$"}
              {course.price.amt}
            </span>
            <span className="text-[#A5A5A5] text-[20px] line-through">
              {course.price.symbol ? course.price.symbol : "$"}
              {course.price.amt + course.price.amt * 0.01}
            </span>
          </div>
          <div className="">
            <NavLink
              to={`courses/${course._id}`}
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
            >
              <button className="bg-[#4A47EF] hover:bg-[#3935f2] w-[130px] text-white font-medium py-2 px-4 rounded-full">
                View Course
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
