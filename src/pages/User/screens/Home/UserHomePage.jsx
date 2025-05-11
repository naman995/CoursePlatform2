import React, { useState } from "react";
import Card from "@/components/Card";
import CourseTabButton from "@/pages/User/component/CourseTabButton/CourseTabButton";
import LiveCourses from "@/pages/HomePage/component/LiveCourses";
import { useLoaderData } from "react-router-dom";

import { getEnrolledCourses } from "@/apis/courses";
import { useEffect } from "react";

export async function loader() {
  // const { user } = localforage.getItem("current-user");
  // if (!user) {
  //   return {
  //     redirect: "/login",
  //   };
  // }

  const courses = await getEnrolledCourses();
  return {
    courses,
  };
}

const UserHomePage = () => {
  const { courses } = useLoaderData();
  const [selectedTab, setSelectedTab] = useState("Currently Learning");
  const [selectedCourses, setSelectedCourses] = useState(
    courses ? courses : []
  );

  const handleTab = (tab) => {
    //filter courses
    setSelectedTab(tab);
    if (tab === "Currently Learning") {
      setSelectedCourses(courses);
    } else if (tab === "Live Courses") {
      setSelectedCourses(
        courses.filter((course) => course.type === "LIVE_TRAINING")
      );
    } else if (tab === "Completed Courses") {
      setSelectedCourses(courses.filter((course) => course.completed));
    }
  };

  return (
    <>
      <div className="p-4 mt-[4%] flex flex-row w-auto overflow-x-scroll no-scrollbar pb-12">
        <CourseTabButton
          onClick={() => handleTab("Currently Learning")}
          bg={selectedTab === "Currently Learning" ? "bg-black" : "bg-gray-300"}
          text="Currently Learning"
          textColor={selectedTab === "Currently Learning" ? "white" : "black"}
        />
        <CourseTabButton
          onClick={() => handleTab("Live Courses")}
          bg={selectedTab === "Live Courses" ? "bg-black" : "bg-gray-300"}
          text="Live Courses"
          textColor={selectedTab === "Live Courses" ? "white" : "black"}
        />
        <CourseTabButton
          onClick={() => handleTab("Completed Courses")}
          bg={selectedTab === "Completed Courses" ? "bg-black" : "bg-gray-300"}
          text="Completed Courses"
          textColor={selectedTab === "Completed Courses" ? "white" : "black"}
        />
      </div>
      <div className="flex flex-wrap pt-2">
        {selectedCourses.length === 0 && (
          <div className="flex justify-center items-center w-full">
            <p className="text-2xl font-semibold text-gray-500">
              No Courses{" "}
              {selectedTab === "Completed Courses" ? "Completed" : "Enrolled"}
            </p>
          </div>
        )}
        <div className="grid grig-col-1 lg:grid-cols-3 gap-4">
          {selectedCourses?.map((course) => (
            <Card key={course._id} {...course} />
          ))}
        </div>
      </div>
      <div className="mt-8"></div>
    </>
  );
};

export default UserHomePage;
