import React from "react";
import { Link } from "react-router-dom";

const Button = ({ q }) => {
  return (
    <div className="">
      <Link
        to={`/search?q=${q}`}
        className="bg-[#000000] rounded-[57.5px] w-24 py-2  mr-2 text-white font-semibold inline-block text-center"
      >
        Search
      </Link>
    </div>
  );
};

export default Button;
