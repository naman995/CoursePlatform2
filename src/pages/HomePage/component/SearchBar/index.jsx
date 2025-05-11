import React from "react";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [q, setQ] = React.useState("");
  const navigate = useNavigate();
  return (
    <div className="mt-5  lg:w-[75%] w-full border-2 border-[#C0C0C0] rounded-[57.5px] flex items-center">
      <input
        className=" pl-4 rounded-[57.5px] border-white shadow-none hover:shadow-none border-0 outline-none w-[80%]  lg:w-[90%]  py-3 placeholder:pl-2 input:pl-4"
        placeholder="Search Anything"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            navigate(`/search?q=${q}`);
          }
        }}
      />
      <div className="">
        <Button q={q} />

      </div>
    </div>
  );
};

export default SearchBar;
