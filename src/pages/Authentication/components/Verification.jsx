import React from "react";
import MainButton from "@/components/MainButton";

const Verification = ({ setCurrent }) => {
  return (
    <div className="flex flex-col items-center mb-20 mt-10">
      <p className="text-white font-semibold text-[48px] mt-8 text-center">
        Verification In Progress
      </p>
      <p className="text-[#BDB8B8] font-light text-[20px] mt-8 mx-[8%] text-center hidden lg:block ">
        It Will Take 2-3 Working Days To Verify Your <br /> Trainer Account
        After That You Will Be Able To
        <br /> Upload And Take Classes.
      </p>
      <p className="text-[#BDB8B8] font-light text-[20px] mt-8 mx-[8%] text-center lg:hidden">
        It Will Take 2-3 Working Days To Verify Your  Trainer Account
        After That You Will Be Able To
         Upload And Take Classes.
      </p>

      <div>
        <MainButton  goto="/" text="Stay Tuned With Us" style="w-[320px] lg:w-[400px] mt-20 " />
      </div>
    </div>
  );
};

export default Verification;
