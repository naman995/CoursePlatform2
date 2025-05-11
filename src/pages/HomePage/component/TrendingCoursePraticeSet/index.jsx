import CourseCard from "@/components/CourseCard";
import React, { useRef, useState, useEffect } from "react";
import TrendingCourseNavbar from "../TrendingCoursePraticeSetNavbar";


const TrendingCoursePraticeSet = ({ title, courses }) => {
  const getCategories = () => {
    const categories = courses.map((course) => course.category);
    return ["All", ...new Set(categories)];
  };

  const [filteredCourses, setFilteredCourses] = React.useState(courses);

  const handleChangeCategory = (category) => {
    if (category === "All") {
      setFilteredCourses(courses);
    } else {
      const filteredCourses = courses.filter(
        (course) => course.category === category
      );
      setFilteredCourses(filteredCourses);
    }
  };
 

  return (
    <div className="lg:px-16 bg-navbar-custom-color mt-10">
      <p className="text-[32px] font-semibold text-center lg:text-left">
        {title}
      </p>
      <TrendingCourseNavbar
        categories={getCategories()}
        handleCategory={handleChangeCategory}
      />
      {/*       
      <div className="grid grid-rows-auto lg:grid-cols-4 gap-x-4">
        <CourseCard />
      </div> */}
      <div className="flex flex-row  ">
        <CourseCard
          style={"flex flex-row  overflow-x-scroll no-scrollbar w-auto  "}
          courses={filteredCourses}
        />
      </div>
    </div>
  );
};



export default TrendingCoursePraticeSet;
