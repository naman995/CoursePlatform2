import MainButton from "@/components/MainButton";
import LoginBottomText from "@/components/LoginBottomText";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useEffect } from "react";
import { Formik } from "formik";

import auth from "@/apis/auth";

const OTP = ({ setCurrent, current }) => {
  const OtpBox = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
  ];
  const navigate = useNavigate();
  const [timer, setTimer] = React.useState(60);
  const email = localStorage.getItem("email");

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleResend = () => {};

  const handleVerify = async (values) => {
    //combine all otp values
    const otp = values.otp1 + values.otp2 + values.otp3 + values.otp4;
    //send otp to backend
    const response = await auth.verifyCode(otp);
    if (response === "Email verified successfully") {
      alert("Email verified successfully. Please login to continue.");
      navigate("/login");
    } else {
      alert("Wrong OTP");
    }
    // setCurrent(current + 1);
  };

  return (
    <div className="mb-10 lg:mb-0">
      <Link to="/login">
        <IoChevronBackCircleOutline
          className="text-white relative -left-20 -top-10 invisible lg:visible"
          size={50}
        />
      </Link>
      <div className="flex flex-col items-center justify-center">
        <p className="text-white font-semibold text-[40px] mt-8 mb-8 lg:mb-4">
          Verify OTP
        </p>
        <div className="hidden lg:block">
          <div className="flex  py-8 ">
            <p className="text-login-text-custom-color text-center font-light text-[18px]">
              Enter the OTP Shared on {email}.
            </p>
          </div>
        </div>

        <Formik
          initialValues={{
            otp1: "",
            otp2: "",
            otp3: "",
            otp4: "",
          }}
          onSubmit={handleVerify}
        >
          {({ handleSubmit, handleChange, values, error }) => (
            <>
              <div className="flex flex-row">
                {OtpBox.map((otp, index) => {
                  return (
                    <input
                      key={index}
                      type=""
                      maxLength="1"
                      className="border-[1px] border-gray-600 text-white bg-[#292929] w-[60px] h-[60px] text-center text-[24px] font-semibold rounded-xl ml-5"
                      value={values[`otp${index + 1}`]}
                      onChange={handleChange(`otp${index + 1}`)}
                    />
                  );
                })}
              </div>
              <div className="relative right-[23.5%] mt-2">
                <p className="text-[#BDB8B8] text-left -ml-6">{timer}s left</p>
              </div>
              <div>
                <MainButton
                  text="Verify"
                  style="w-[330px] lg:w-[400px] mt-5"
                  onClick={handleSubmit}
                />
              </div>
            </>
          )}
        </Formik>
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

export default OTP;
