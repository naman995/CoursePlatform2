import BlogCard from "@/pages/HomePage/component/BlogCard";
import React from "react";

const Blogs = ({ heading, subHeading }) => {
  return (
    <div className="px-6 lg:px-16 pb-20">
      <p className="text-3xl font-semibold">{heading}</p>
      <p className="text-xl text-text-custom-color">{subHeading}</p>
      <BlogCard />
    </div>
  );
};

export default Blogs;
