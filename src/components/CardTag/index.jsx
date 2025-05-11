import React from "react";

const CardTag = ({ bg, title }) => {
  return (
    <div
      className={`mr-2 px-3 rounded-full text-center text-sm font-semibold text-black ${bg} capitalize flex items-center justify-center`}
    >
      {title}
    </div>
  );
};

export default CardTag;
