import UserHomePage from "./screens/Home/UserHomePage";
import React from "react";
import RatingModal from "./component/RatingModal/RatingModal";
import LiveCourseCard from "@/components/Card/LiveCourseCard";
import CartAndCheckout from "../CartCheckout";

const index = () => {
  return (
    <div>
      {/* <CartAndCheckout /> */}
      {/* <LiveCourseCard /> */}
      {/* <RatingModal /> */}
      <UserHomePage />
    </div>
  );
};

export default index;
