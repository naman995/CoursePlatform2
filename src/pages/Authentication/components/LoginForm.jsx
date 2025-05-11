import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import auth from "@/apis/auth";

import InputField from "@/components/InputField";
import LoginBottomText from "@/components/LoginBottomText";
import { toast } from "react-toastify";

const LoginForm = () => {
  const navigate = useNavigate();
  
  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const { user, token } = await auth.login(values.email, values.password);
      if (user) {
        if (user.accountType === "trainer") {
          navigate("/trainer");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      toast.error(err.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validate}
        onSubmit={handleLogin}
      >
        {(formik) => (
          <div className="mx-[9%] mb-10 lg:mx-0">
            <p className="text-login-text-custom-color py-8 text-center">
              Please Enter Your Log In Details
            </p>
            <Form>
              <InputField
                name="email"
                type="email"
                placeholder="Enter your E-mail Address"
                icon={<AiOutlineMail color="white" size={20} />}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-400 ml-5 -mt-5 mb-5">
                  {formik.errors.email}
                </div>
              )}
              <InputField
                name="password"
                type="password"
                placeholder="Enter Your Password Here"
                icon={<AiOutlineLock color="white" size={20} />}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-400 ml-5 -mt-5 mb-4">
                  {formik.errors.password}
                </div>
              )}
              <button
                type="submit"
                className="bg-login-button-custom-color w-full lg:px-40 py-2 rounded-[40px] text-white text-center text-[20px] font-semibold"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Logging in..." : "Log In"}
              </button>
            </Form>
            <div className="text-white text-[16px] text-center font-light my-4">
              Don't have an account ?&nbsp;
              <Link to="/register" className="text-signUp-blue-custom-color">
                Sign Up.
              </Link>
            </div>
            <div className="border-[1px] border-gray-600"></div>
            <LoginBottomText />
          </div>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
