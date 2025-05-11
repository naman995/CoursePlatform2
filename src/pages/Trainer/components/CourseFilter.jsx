import React from "react";

let filter = ["Uploaded Courses", "Live Sessions"];

function Filter({ text, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full bg-gray-200 px-4 py-2 group mb-2 hover:bg-black cursor-pointer"
    >
      <h3 className="font-semibold group-hover:text-white text-center">
        {text}
      </h3>
    </button>
  );
}

function CourseFilter({ selectedTab, handleTab }) {
  return (
    <div className="mx-6 space-x-4 w-[300px] lg:w-[500px] ">
      <div className="flex overflow-x-auto lg:flex-row  space-x-2 lg:space-x-4">
        {filter.map((text) => (
          <Filter
            text={text}
            isSelected={selectedTab === text ? true : false}
            onClick={() => handleTab(text)}
          />
        ))}
      </div>
    </div>
  );
}

export default CourseFilter;
