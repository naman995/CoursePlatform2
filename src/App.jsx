import { lazy, Suspense, useEffect, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Protected from "@/layout/Protected";
const MainLayout = lazy(() => import("@/layout/Main"));
import TrainerLayout from "@/layout/Trainer";
import Student from "@/layout/Student";

import PreLoader from "@/components/PreLoader";

import TrainerDashboard, {
  loader as trainerLoader,
  action as trainerAction,
} from "@/pages/Trainer";
import TrainerUpload from "@/pages/Trainer/screens/TrainerUpload";

import Course, {
  loader as trainerCourseLoader,
  action as trainerCourseAction,
} from "@/pages/Trainer/pages/course";

import ProfileOptions from "@/pages/ProfileOptions";

import AuthRoutes from "@/routes/AuthRoutes";
import navLinks from "@/routes/NavLinks";

import Index from "@/routes";

import NotFoundPage from "@/pages/NotFoundPage";
import Wallet from "@/pages/Wallet";

import UserHomePage, {
  loader as studentDashboardLoader,
} from "@/pages/User/screens/Home/UserHomePage";
import CartAndCheckout, { loader as CartLoader } from "@/pages/CartCheckout";
import WatchCourse, { loader as watchCourseLoader } from "@/pages/WatchCourse";
import Profile from "@/layout/Profile";
import ChangePassword from "@/pages/ProfileOptions/component/ChangePassword";
import PrivacyPolices from "@/pages/ProfileOptions/component/PrivacyPolices";
import EditCourse, { loader as editLoader } from "@/pages/Trainer/screens/Edit";
import Wishlist from "@/pages/Wishlist";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />} errorElement={<NotFoundPage />}>
      {AuthRoutes.map((route) => (
        <Route key={route.path} {...route} />
      ))}
      <Route errorElement={<NotFoundPage />}>
        <Route element={<Protected />}>
          <Route element={<TrainerLayout />}>
            <Route
              path="/trainer"
              element={<TrainerDashboard />}
              loader={trainerLoader}
              action={trainerAction}
            />
            <Route
              path="/trainer/courses/:courseId"
              element={<Course />}
              loader={trainerCourseLoader}
              action={trainerCourseAction}
            />
            <Route
              path="/trainer/courses/:courseId/edit"
              element={<EditCourse />}
              loader={editLoader}
            />
            <Route path="/trainer/new" element={<TrainerUpload />} />
          </Route>
          <Route element={<Student />}>
            <Route
              path="/dashboard"
              element={<UserHomePage />}
              loader={studentDashboardLoader}
            />
            <Route
              path="/cart"
              element={<CartAndCheckout />}
              loader={CartLoader}
            />
            <Route
              path="/wishlist"
              element={<Wishlist />}
              loader={CartLoader}
            />
            <Route
              path="/watch/:courseId/:index"
              element={<WatchCourse />}
              loader={watchCourseLoader}
            />
            <Route path="/profile" element={<Profile />}>
              <Route index element={<ProfileOptions />} />
              <Route
                path="/profile/ChangePassword"
                element={<ChangePassword />}
              />
              <Route path="/profile/Privacy" element={<PrivacyPolices />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Route>
  )
);

const getUsersLocation = async () => {
  const response = await fetch("https://ipapi.co/json/");
  const data = await response.json();
  return data;
};

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      //check if rates in local storage
      if (
        localStorage.getItem("new-load") === "true" ||
        !localStorage.getItem("new-load")
      ) {
        localStorage.setItem("new-load", "false");
        localStorage.removeItem("rates");
      }

      if (
        !localStorage.getItem("rates") ||
        !Array.isArray(JSON.parse(localStorage.getItem("rates")))
      ) {
        localStorage.setItem(
          "rates",
          JSON.stringify([
            {
              to: "USD",
              rate: 1,
              base: "USD",
            },
            { to: "USD", base: "INR", rate: 0.012 },
            { to: "EUR", base: "USD", rate: 0.92 },
            { to: "INR", base: "USD", rate: 81.93 },
            { to: "EUR", base: "INR", rate: 0.011 },
            { to: "GBP", base: "USD", rate: 0.78 },
            { to: "GBP", base: "INR", rate: 0.0095 },
            { to: "INR", base: "GBP", rate: 104.81 },
          ])
        );
      }

      const location = await getUsersLocation();

      localStorage.setItem("user-location", JSON.stringify(location));
      setLoading(false);
    })();
  });

  if (loading) {
    return <PreLoader />;
  }

  return (
    <Suspense
      fallback={<PreLoader />}
      onResolve={() => setLoading(false)}
      onReject={() => setLoading(false)}
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
