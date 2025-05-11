import React, { useState } from "react";
import img from "@/assets/Home/card3.png";
import { getBlogs } from "@/apis/blogs";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const BlogCard = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getBlogs();
      setBlogs(res);
    })();
  }, []);

  return (
    <div className=" ">
      <div className="mt-5">
        <div className="">
          <div className="flex flex-col">
            {blogs?.map((item, index) => (
              <Link key={item._id} to={`/blogs/${item._id}`} className="mt-10 ">
                <div className=" flex flex-col lg:flex-row">
                  <div>
                    <img
                      className="w-[500px] h-[300px]"
                      src={item.imageUrl || "/course.jpg"}
                      alt=""
                    />
                  </div>
                  <div className="lg:ml-5 lg:w-1/2">
                    <p className="text-[28px] font-[500]">{item.title}</p>
                    <p className="text-[24px] text-[#535353]">
                      {item.content.slice(0, 100)}
                    </p>
                    <p className="mt-10">{item.viewCount} Views</p>
                    {/* <p className="" >{item.category}</p> */}
                    <p className="text-[24px] font-[400]">
                      {item.comments.length} Comments
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default BlogCard;
