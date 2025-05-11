import React, { useState, useEffect } from "react";
import Filter from "../Filter";
import ReactPagination from "react-paginate";
import CourseCard from "@/components/CourseCard";

const SearchResult = ({ courses }) => {
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    setFiltered(courses);
  }, [courses]);
  return (
    <div className="">
      <div className="bg-navbar-custom-color px-10 w-100vh  mt-5 flex ">
        <div className="w-[70%] grid lg:grid-cols-3 lg:gap-x-10 grid-cols-3    ">
          <CourseCard
            style={"grid lg:grid-cols-4 lg:w-[145vh] w-[45vh]   sm:grid-cols-2"}
            courses={filtered}
          />
        </div>
        <div className="w-[23%] ml-[8%] hidden lg:block">
          <Filter courses={courses} setFiltered={setFiltered} />
        </div>
      </div>
      {/* <ReactPagination
        containerClassName="flex gap-4 justify-center items-center mt-10 pb-10 text-[#A0A3BD]"
        activeClassName="text-blue-500 border-b-2 border-[#4D5EDC]"
        previousLinkClassName="text-[#4D5EDC] pb-[4px] px-[7px] pr-[8px] rounded-full border   border-[#4D5EDC] hover:text-[#ffffff] hover:bg-[#4D5EDC]"
        nextLinkClassName="text-[#4D5EDC] pb-[4px] px-[7px] pl-[8px] rounded-full border   border-[#4D5EDC] hover:text-[#ffffff] hover:bg-[#4D5EDC]"
        previousLabel="<"
        breakLabel="..."
        nextLabel=">"
        // pageCount={countPage}
        // onPageChange={changePage}
        pageRangeDisplayed={1}
        renderOnZeroPageCount={null}
      /> */}
    </div>
  );
};

export default SearchResult;
