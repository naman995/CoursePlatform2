import MainButton from "@/components/MainButton";
import LoginBottomText from "@/components/LoginBottomText";
import React from "react";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const EditEmail = ({ setCurrent, current }) => {
  return (
    <div className="mb-10 lg:mb-0">
      <Link to="/login">
        <IoChevronBackCircleOutline
          className="text-white relative -left-20 -top-10 invisible lg:visible"
          size={50}
        />
      </Link>
      <div className="flex flex-col items-center justify-center">
        <p className="text-white font-semibold text-[40px] mt-8">Verify OTP</p>
        <div className="hidden lg:block">
          <div className="flex py-8 ">
            <p className="text-login-text-custom-color text-center font-light text-[18px]">
              Enter the OTP Shared on {email}.
            </p>
            {/* <Link to="/editemail"> */}
            <button
              onClick={() => {
                setCurrent((current) => current + 1);
              }}
              className="text-[#FF6565] font-light text-[18px] "
            >
              &nbsp;Edit email?
            </button>
            {/* </Link> */}
          </div>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden">
          <div className="flex flex-col  py-8 ">
            <p className="text-login-text-custom-color text-center font-light text-[18px]">
              Enter the OTP Shared on
            </p>
            <div className="flex flex-row">
              <p className="text-login-text-custom-color text-center font-light text-[18px]">
                {" "}
                {email}.
              </p>
              <Link to="/editemail">
                <button
                  onClick={() => {
                    setCurrent((current) => current + 1);
                  }}
                  className="text-[#FF6565] font-light text-[18px]"
                >
                  &nbsp;Edit email?
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-row">
          {OtpBox.map((otp, index) => {
            return (
              <input
                key={index}
                type=""
                maxLength="1"
                className="border-[1px] border-gray-600 text-white bg-[#292929] w-[60px] h-[60px] text-center text-[24px] font-semibold rounded-xl ml-5"
              />
            );
          })}
        </div>
        <div className="relative right-[23.5%] mt-2">
          <p className="text-[#BDB8B8] text-left">{Time} Left</p>
        </div>
        <div>
          <MainButton
            text="Verify"
            style="w-[330px] lg:w-[400px] mt-5"
            onClick={() => {
              setCurrent(current + 1);
              // console.log("hello");
            }}
          />
        </div>
        <div className="flex flex-row mt-5">
          <p className="text-white font-light text-[16px] ">
            Didn't receive the OTP? &nbsp;
          </p>
          <p className="text-cyan-400">Resend</p>
        </div>
        <LoginBottomText />
      </div>
    </div>
  );
};

export default EditEmail;
