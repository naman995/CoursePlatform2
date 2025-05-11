import React from "react";
import Navbar from "@/components/AuthNav";
import Footer from "@/components/Footer";
import SearchResult from "./component/SearchResult";
import SearchBar from "@/components/SearchBar";

import { search } from "@/apis/courses";
import { useSearchParams } from "react-router-dom";

const SearchCourse = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const [courses, setCourses] = React.useState([]);

  React.useEffect(() => {
    if (q.length > 0) {
      handleSearch(q);
    }
  }, [q]);

  const handleSearch = async (searchText) => {
    const data = await search(searchText);
    setCourses(data);
  };

  return (
    <>
      <Navbar />
      <div className="mt-6 mb-8">
        <SearchBar q={q} handleSearch={handleSearch} />
        <SearchResult courses={courses} />
      </div>
      <Footer />
    </>
  );
};

export default SearchCourse;
