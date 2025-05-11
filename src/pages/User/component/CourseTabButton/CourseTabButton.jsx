import React from "react";

const CourseTabButton = ({
  bg = "#2563eb",
  text,
  textColor = "#00000",
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`min-w-[250px]  h-[53px] rounded-[32px] ${bg} text-${textColor} font-semibold mr-2`}
    >
      {text}
    </button>
  );
};

export default CourseTabButton;
