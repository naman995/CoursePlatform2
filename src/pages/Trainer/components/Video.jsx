import React from "react";

import { FaVideo } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";

function Video({
  serial,
  onEdit,
  onDelete,
  thumbnail,
  isSelected,
  isUploaded,
}) {
  return (
    <div
      className={`relative h-18 w-32 rounded-xl bg-[#D9D9D9] hover:bg-[#9B9B9B] ${
        isSelected && "bg-[#9B9B9B]"
      } cursor-pointer group`}
    >
      <span className="absolute -top-2 -left-2 z-10 flex w-7 h-7 bg-[#4D5EDC] rounded-full text-white font-bold justify-center items-center">
        {serial}
      </span>
      <div className="absolute top-0 left-0 w-full h-full  group-hover:hidden block py-4">
        <div className="flex h-full items-center justify-center">
          {!thumbnail ? (
            <FaVideo className="text-white mx-auto" size={42} />
          ) : (
            // <img src={thumbnail} className="h-24 w-32 object-fill rounded-xl" />
            <video
              class="w-full h-auto max-w-full border border-gray-200 rounded-lg dark:border-gray-700"
              controls={false}
            >
              <source src={thumbnail} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full  group-hover:block hidden rounded-xl">
        <div className="flex flex-row h-full items-center justify-center divide-x-2 divide-x-white">
          <button
            onClick={() => onEdit(serial)}
            className="h-full w-1/2 flex items-center justify-center hover:bg-opacity-50 bg-blue-400 rounded-l-xl"
          >
            <FiEdit2 className="text-white h-8 hover:text-blue-600" />{" "}
          </button>
          {!isUploaded && (
            <button
              onClick={() => onDelete(serial - 1)}
              className="h-full w-1/2 text-center flex items-center justify-center hover:bg-opacity-50 bg-red-400 rounded-r-xl"
            >
              <AiFillDelete className="h-8 text-white hover:text-red-600" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Video;
