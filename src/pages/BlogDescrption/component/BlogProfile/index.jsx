import React from "react";
import profile from "@/assets/Home/profile.png";

const BlogProfile = () => {
  const profileDetails = {
    name: "Akash mehra",
    date: "8 july 2022",
    time: "2 min",
  };
  return (
    <div className="flex items-center mb-16">
      <div>
        <img className="w-[80px]" src={profile} alt="" />
      </div>
      <div className="ml-4">
        <p className="text-[32px] font-[500]">{profileDetails.name}</p>
        <div className="flex ">
          <p className="text-[16px] font-[400]">{profileDetails.date}</p>
          <p  className="ml-2 text-[16px] font-[500]">{profileDetails.time} Read</p>
        </div>
      </div>
    </div>
  );
};

export default BlogProfile;
