import React from "react";
import BlogImg from "@/assets/Home/blog.png";
import Blogs from "@/components/Blogs";
import Footer from "@/components/Footer";
import BlogProfile from "../BlogProfile";

const Blogdetails = () => {
  const description = {
    heading:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam Lorem ipsum dolor sit amet consectetur adipisicing ",
    subHeading: "Start with Identifying the Primary Blog",
    subHeading2: "Start with Identifying ",
    description:
      "lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur\
       adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam pellentesque nec\
    nam aliquam sem et. Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada.\
     Senectus et netus et malesuada fames ac. Mi proin sed libero enim sed faucibus turpis in eu. Eu turpis\
      egestas pretium aenean pharetra magna. Laoreet suspendisse interdum consectetur libero id faucibus nisl.\
       Vitae congue mauris rhoncus aenean vel elit scelerisque. Vitae proin sagittis nisl rhoncus mattis rhoncus urna.\
        Mollis aliquam ut porttitor leo a diam. Amet consectetur adipiscing elit pellentesque habitant morbi tristique senectus et.\
         Gravida neque convallis a cras semper auctor neque. Accumsan lacus vel facilisis volutpat e\
         lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur\
       adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam pellentesque nec\
    nam aliquam sem et. Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada.\
     Senectus et netus et malesuada fames ac. Mi proin sed libero enim sed faucibus turpis in eu. Eu turpis\
      egestas pretium aenean pharetra magna. Laoreet suspendisse interdum consectetur libero id faucibus nisl.\
       Vitae congue mauris rhoncus aenean vel elit scelerisque. Vitae proin sagittis nisl rhoncus mattis rhoncus urna.\
        Mollis aliquam ut porttitor leo a diam. Amet consectetur adipiscing elit pellentesque habitant morbi tristique senectus et.\
         Gravida neque convallis a cras semper auctor neque. Accumsan lacus vel facilisis volutpat e",
  };

  return (
    <>
      <div className="mx-8 lg:mx-32 content-center">
        <p className=" text-[32px] lg:text-[48px] font-[600] mt-5 lg:mb-4">
          {description.heading}
        </p>
        <BlogProfile />
        <img className="w-auto mx-auto" src={BlogImg} alt="BlogImages" />
        <p className="text-[22px] lg:text-[38px] font-[600] mt-5 lg:mt-20">
          {description.subHeading}
        </p>
        <p className="text-[18px] lg:text-[24px] font-[300] mt-5 lg:mt-10">
          {description.description}
        </p>
        <p className="text-[22px] lg:text-[38px] font-[600] mt-5 lg:mt-10">
          {description.subHeading2}
        </p>
        <p className="text-[18px] lg:text-[24px] font-[300] mt-5 lg:mt-10">
          {description.description}
        </p>
      </div>
      <div className="mt-5 lg:mt-10">
        <Blogs heading={"More of Blog's"} />
        <Footer />
      </div>
    </>
  );
};
export default Blogdetails;
