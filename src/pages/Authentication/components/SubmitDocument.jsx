import React, { useState } from "react";
import MainButton from "@/components/MainButton";
import LoginBottomText from "@/components/LoginBottomText";
import fileIcon from "@/assets/Home/Paper Upload.png";

const SubmitDocument = ({ setCurrent, current, dispatch, state }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  return (
    <div className="flex flex-col items-center mb-20 lg:flex lg:flex-col lg:items-center">
      <p className="text-white font-semibold text-[48px] mt-8 text-center lg:text-left">
        Submit Documents
      </p>
      <div className="flex  py-8">
        <p className="text-login-text-custom-color text-center font-light text-[18px]">
          Submit The details So we can Verify your Trainer Account
        </p>
      </div>
      <div>
        <label className="bg-[#2A2A2A]   ">
          <div className="bg-[#2A2A2A] w-[300px] h-[250px] rounded-3xl flex flex-col items-center justify-center">
            <img
              src={fileIcon}
              className=" mx-auto mb-6 text-[#696969] w-[16%] "
              color="#696969"
            />

            <p className="font-[500] text-[#696969] text-[20px]">
              Add Your CV Here
            </p>
            <p className="mt-8 text-[#7D7D7D] text-[20px] font-[300]">
              Choose file to Upload Your CV
            </p>
            <input type="file" className="hidden" onChange={handleFileSelect} />
          </div>
        </label>
      </div>

      <div></div>
      <MainButton
        text="Next"
        style="w-[320px] lg:w-[400px] mt-10"
        onClick={() => {
          setCurrent((current) => current + 1);
        }}
      />

      <LoginBottomText />
    </div>
  );
};

export default SubmitDocument;
