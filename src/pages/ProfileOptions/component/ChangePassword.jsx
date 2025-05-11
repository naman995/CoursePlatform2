import React, { useState } from "react";
import Button from "./Button";
import { AiTwotoneEyeInvisible, AiOutlineEye } from "react-icons/ai";
import SaveModel from "./SaveModel";

const ChangePassword = () => {
  const [displaySaveModel, setDisplaySaveModel] = useState(false);
  const handleSaveModel = () => {
    setDisplaySaveModel(!displaySaveModel);
  };
  return <div className="mt-[35%] lg:mt-[10%]  flex flex-col items-center justify-center">
    <p className="text-3xl font-[600]">Change Password</p>
    <p>Please create your New password here</p>
    <div className="mt-4 pb-8">
      <Field placeholder={"Enter Your Old Password Here"} />
      <Field placeholder={"Enter New Password Here"} />
      <Field placeholder={"Re-enter New Password Here"} />
    </div>
    <Button onClick={handleSaveModel} text={"Save And Continue"} />
    {displaySaveModel && <SaveModel text={"  Your Changes Have Been \n saved Successfully!"} />}

  </div>
};

export default ChangePassword;

const Field = ({ placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handlePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex flex-row mt-2 border  rounded-[10px] border-[#7D7D7D] items-center ">
      <input type={showPassword ? "text" : "password"} placeholder={placeholder} className="outline-none w-[250px]  lg:w-[400px] rounded-[10px]  px-3 py-3 placeholder:text-[#7D7D7D] " />
      {
        showPassword ?
          <AiOutlineEye onClick={handlePassword} className="mr-4 text-[#7D7D7D]" size={32} />
          :
          <AiTwotoneEyeInvisible onClick={handlePassword} className="mr-4 text-[#7D7D7D]" size={32} />
      }
    </div>
  );
}