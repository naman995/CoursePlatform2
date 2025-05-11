import React, { useEffect, useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import HeroSection from "./component/HeroSection";
import Discount from "@/components/Discount";
import TrendingCoursePraticeSet from "./component/TrendingCoursePraticeSet";
import Review from "./component/Reviews";
import Blogs from "../../components/Blogs";
import NavBar from "@/components/NavBar";
import OnlineTutor from "./component/OnlineTutor";
import LiveCourses from "./component/LiveCourses";
import OurServices from "./component/OurServices";
import Footer from "@/components/Footer";
import ProfessionalAccreditations from "./component/ProfessionalAccreditations";
import JoinAsTutor from "./component/JoinAsTutor";

import { getHome } from "@/apis/home";

export async function loader() {
  const courses = await getHome();
  return { courses };
}

function HomePage() {
  const { courses } = useLoaderData();

  const navigate = useNavigate();

  return (
    <>
      <div className="">
        <NavBar />
        <HeroSection />
        <Discount />
        <TrendingCoursePraticeSet
          courses={courses.trendingCourses}
          title="Trending Courses"
        />
        <TrendingCoursePraticeSet
          courses={courses.newCourses}
          title="New Courses"
        />
        <OnlineTutor />
        {/* <TrendingCoursePraticeSet courses={courses} title="Practice Paper" handleCategory={handleCategory}  /> */}
        <LiveCourses title="Live Courses" courses={courses.liveCourses} />
        <OurServices />
        <ProfessionalAccreditations />
        <Review />
        <Blogs
          subHeading={
            "Choose your online tutor and start learning anytime anywhere"
          }
          heading={"Our Blogs"}
        />
        <JoinAsTutor />
        <Footer />
      </div>
    </>
  );
}
export default HomePage;
