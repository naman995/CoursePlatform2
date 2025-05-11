import React from "react";
import LiveCourseCard from "../LiveCourseCard";

import TrendingCourseNavbar from "../TrendingCoursePraticeSetNavbar";

const LiveCourses = ({ courses, title }) => {
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
    <div className=" lg:px-16 bg-navbar-custom-color mt-10">
      <p className="text-[32px] font-semibold text-center lg:text-left">
        {title}
      </p>
      <TrendingCourseNavbar
        categories={getCategories()}
        handleCategory={handleChangeCategory}
      />
      <div className="flex flex-row h-auto w-full overflow-x-scroll no-scrollbar">
      <LiveCourseCard courses={filteredCourses} />
      </div>
    </div>
  );
};

export default LiveCourses;
