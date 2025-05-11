import React from "react";
import { BsSearch } from "react-icons/bs";

const SearchBar = ({ handleSearch, q }) => {
  const [searchText, setSearchText] = React.useState(q);
  return (
    <div className="mx-8 mb-10 focus:outline-none mt-10 flex items-center border-[2px] border-[#4D5EDC] rounded-[19px]">
      <BsSearch size={25} className="text-gray-400 ml-6" />
      <input
        className=" mx-2 w-full inline-block shadow-none hover:shadow-none placeholder:text-gray-400 focus:outline-none py-4"
        type="text"
        placeholder="Search For Courses , Lectures"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch(searchText);
          }
        }}
      />
    </div>
  );
};

export default SearchBar;
