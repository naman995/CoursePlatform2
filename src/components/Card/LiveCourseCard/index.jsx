import CardTag from "@/components/CardTag";
import React from "react";
import { AiFillStar } from "react-icons/ai";

const LiveCourseCard = () => {
  return (
    <div className="lg:pl-3">
      <div className="lg:m-3">
        <div className="w-[500px] h-[470px] bg-[#fdfdfd] rounded-lg shadow-lg overflow-hidden p-6">
          {/* CARD HEADER SECTION */}
          <div className="flex gap-3 mb-2">
            <img
              className="w-[157px] h-[170px] rounded-2xl object-cover"
              src="/Course.jpg"
              alt="cardImage"
            />
            <div className="flex flex-col justify-start">
              <h5 className="mb-2 text-xl font-semibold text-black">
                Photoshop latest Course By Designer
              </h5>

              {/* CARD TAGS */}
              <div className="flex flex-wrap mb-2">
                <CardTag bg="bg-green-400" title="React" />
                <CardTag bg="bg-[#FFDBC7]" title="TypeScript" />
              </div>
              <p className="text-sm text-gray-500">43 lessons. 3 hours</p>
            </div>
          </div>
          <p className="text-gray-500 text-xl mb-4 font-light">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis et,
            exercitationem quaerat impedit dolore optio porro illum similique
          </p>

          <div className="flex justify-start flex-col space-y-8 mb-3">
            <p className="font-normal text-base text-green-500 mr-2">
              Last Updated On 2 mar 2022 , 3:00 Pm
            </p>

            <p className="font-normal text-base text-gray-400 mr-2">
              upcoming Session on :
            </p>
          </div>

          <div className="flex justify-between ">
            <div className="">
              <p className="text-base font-normal text-black">
                Date - 26 Jan 2023
              </p>
              <p className="text-base font-normal text-black">
                Timings 7:00 Pm - 8:00 pM
              </p>
            </div>

            <button className="bg-blue-600 text-center hover:bg-blue-700 text-white text-lg px-8 py-3 border rounded-full mr-4">
              View Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveCourseCard;
