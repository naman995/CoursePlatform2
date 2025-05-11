import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import InputField from "@/components/InputField";
import LoginBottomText from "@/components/LoginBottomText";

import auth from "@/apis/auth";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (user) => {
    const data = await auth.register(user);
    //check if data contains user key
    if (data.token && data.user) {
      navigate("/AuthFlow/otp");
    } else if (data.err) {
      toast.error(data.err.message);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={validate}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <div className="mx-[9%]  lg:mx-0">
            <p className="text-login-text-custom-color py-8 text-center">
              Looks like you don't have an account.Create One
            </p>
            <Form>
              <InputField
                name="Email"
                type="text"
                placeholder="Enter your E-mail Address"
                icon={<AiOutlineMail color="white" size={20} />}
                value={formik.values.email}
                onChange={formik.handleChange("email")}
              />
              {formik.touched.email ? (
                <div className="text-red-400 ml-5 -mt-5 mb-5   ">
                  {formik.errors.email}
                </div>
              ) : null}
              <InputField
                name="password"
                type="password"
                placeholder="Enter Your Password Here"
                icon={<AiOutlineLock color="white" size={20} />}
                value={formik.values.password}
                onChange={formik.handleChange("password")}
              />
              {formik.touched.password ? (
                <div className="text-red-400 ml-5 -mt-5 mb-5   ">
                  {formik.errors.password}
                </div>
              ) : null}

              {/* <div className="text-text-white-custom-color text-right mb-6 text-[12px]">
                <Link className="" to="/reset">
                  FORGET PASSWORD
                </Link>
              </div> */}
              <button
                className="bg-login-button-custom-color w-full  lg:px-[119px] py-2 rounded-[40px] text-white text-center text-[20px] font-semibold"
                onClick={formik.handleSubmit}
              >
                Create Account &nbsp;
              </button>
            </Form>
            {/* <button
              className="text-white bg-transparent  my-5 flex flex-row items-center justify-center mx-auto"
              onClick={() => {}}
            >
              Or Continue With Gmail
              <FcGoogle
                className="ml-2 bg-white rounded-full p-1"
                size={30}
                color="white"
              />
            </button> */}
            {/* <LoginBottomText/> */}
          </div>
        )}
      </Formik>
      <div className="text-white text-[16px] text-center font-light my-4">
        Do You have an account ?&nbsp;
        <Link to="/login" className="text-signUp-blue-custom-color">
          Sign In.
        </Link>
      </div>
      <div className="border-[1px] border-gray-600 "></div>
      <LoginBottomText />
    </div>
  );
};

export default SignUp;
