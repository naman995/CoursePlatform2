// import { lazy } from "react";

// const LoginPage = lazy(() => import("@/pages/Authentication/LoginPage"));
// const RegisterPage = lazy(() => import("@/pages/Authentication/RegisterPage"));
// const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
// const SearchCourse = lazy(() => import("@/pages/SearchCourse"));
// const HomePage = lazy(() => import("@/pages/HomePage"));
import LoginPage from "@/pages/Authentication/LoginPage";

const FooterLinks = [
  {
    path: "login",
    element: <LoginPage />,
  },
  // {
  //   path: "register",
  //   element: <RegisterPage />,
  // },
  // {
  //   path: "/",
  //   element: <HomePage />,
  // },
  // {
  //   path: "/search/:query",
  //   element: <SearchCourse />,
  // },
  // {
  //   path: "*",
  //   element: <NotFoundPage unProtected />,
  // },
];
export default FooterLinks;
