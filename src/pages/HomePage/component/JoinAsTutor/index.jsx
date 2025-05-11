import MainButton from "@/components/MainButton";
import useAuth from "@/hooks/useAuth";
import React from "react";

const JoinAsTutor = () => {
  const { user } = useAuth();
  if (user) return null;
  return (
    <div className="">
      <div className="flex flex-col items-center justify-center h-64 border-button-custom-color border-[1px] m-4 lg:m-16 rounded-[42px]">
        <p className="font-semibold lg:text-[40px] text-[24px] text-center lg:text-left">
          Join Us As A <b>Tutor</b> At our Platform and get Started
        </p>
        <p className="text-[18px] text-center">
          Choose Your Online Tutor And Start Learning Anytime Anywhere
        </p>
        <MainButton
          style="mt-5 text-[30px] rounded-[63px] px-12"
          text="Join Now"
          goto="/login?step=1"
        />
      </div>
    </div>
  );
};

export default JoinAsTutor;
