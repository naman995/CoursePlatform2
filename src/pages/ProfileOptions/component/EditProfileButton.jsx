import React from "react";
import { RiPencilFill } from "react-icons/ri";

const EditProfileButton = ({ onClick, text }) => {
  return (
    <div className="flex justify-end" onClick={onClick}>
      <button className="px-4 py-2 text-[#4D5EDC] border border-[#4D5EDC]  flex items-center gap-x-2 rounded-[100px]">
        <RiPencilFill />
        <p className="font-[600]">{text}</p>
      </button>
    </div>
  );
};

export default EditProfileButton;
