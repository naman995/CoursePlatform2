import React from "react";
import { Link } from "react-router-dom";

const ExploreButton = ({ text }) => {
  return (
    <Link to="/courses">
      <div className="bg-[#101010] mt-4 lg:mt-0 rounded-3xl flex items-center justify-center py-3 ">
        <p className="text-white px-4 ">{text}</p>
      </div>
    </Link>
  );
};

export default ExploreButton;
