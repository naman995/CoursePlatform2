import AuthFLow from "@/pages/Authentication/AuthFlow";
import BlogDescrption from "@/pages/BlogDescrption";
import EditEmail from "@/pages/Authentication/components/EditEmail";

import { lazy } from "react";

const LoginPage = lazy(() => import("@/pages/Authentication/LoginPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
const SearchCourse = lazy(() => import("@/pages/SearchCourse"));
const HomePage = lazy(() => import("@/pages/HomePage"));
const CourseDetails = lazy(() => import("@/pages/CourseDetails"));
const BrowseCourses = lazy(() => import("@/pages/BrowseCourses"));
const Wallet = lazy(() => import("@/pages/Wallet"));

import { loader as loginLoader } from "@/pages/Authentication/LoginPage";
import { loader as browseCourseLoader } from "@/pages/BrowseCourses";
import { loader as CourseLoader } from "@/pages/CourseDetails";
import { loader as HomeLoader } from "@/pages/HomePage";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TandC from "../pages/T&C";
import AboutUs from "../pages/AboutUs";

const routes = [
  {
    path: "login",
    element: <LoginPage />,
    loader: loginLoader,
  },
  {
    path: "AuthFlow/otp",
    element: <AuthFLow />,
  },
  {
    path: "/",
    element: <HomePage />,
    loader: HomeLoader,
  },
  {
    path: "/search",
    element: <SearchCourse />,
  },
  {
    path: "/courses",
    element: <BrowseCourses />,
    loader: browseCourseLoader,
  },
  {
    path: "/course/:courseId",
    element: <CourseDetails />,
    loader: CourseLoader,
  },
  {
    path: "/blogs",
    element: <BlogDescrption />,
  },
  {
    path: "/wallet",
    element: <Wallet />,
  },
  {
    path: "/blogs/:blogId",
    element: <BlogDescrption />,
  },
  {
    path: "/privacyPolicy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/TandC",
    element: <TandC />,
  },
  {
    path: "/aboutUs",
    element: <AboutUs />,
  },
  {
    path: "*",
    element: <NotFoundPage unProtected />,
  },
  // {
  //   path: "*",
  //   element: <NotFoundPage unProtected />,
  // },
];
export default routes;
