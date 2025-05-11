import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

import SignUp from "@/pages/Authentication/components/SignUp";
import LoginForm from "../components/LoginForm";
import vector from "@/assets/Home/logomini.svg";
import { toast } from "react-toastify";

export async function loader() {
  const user = await localStorage.getItem("current-user");
  return { user };
}

function Login() {
  const query = new URLSearchParams(window.location.search);
  const step = query.get("step");
  let limit = 0;
  const [current, setCurrent] = useState(step ? parseInt(step) : 0);
  const { user } = useLoaderData();

  useEffect(() => {
    if (step && (step == 1 || step == "1") && limit == 0) {
      limit = 1;
      toast.success("Continue Signing up as Trainer");
    }
  }, [step]);

  const Links = [
    {
      id: 0,
      name: "Login",
      path: "/login",
      onclick: () => setCurrent(0),
    },
    {
      id: 1,
      name: "SignUp",
      path: "/register",
      onclick: () => setCurrent(1),
    },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.accountType === "trainer") {
        navigate("/trainer");
      } else {
        navigate("/");
      }
    }
  }, [user]);

  if (!user)
    return (
      <div className="bg-login-background-custom-color w-screen  h-screen lg:flex lg:items-center lg:justify-center">
        <div className="flex flex-col lg:flex lg:flex-row lg:justify-evenly w-[100%]  ">
          <div>
            <div className="">
              <div className="flex justify-center mt-10 lg:mt-0 mb-4">
                <img src={vector} alt="Logo " />
              </div>
              <div className="flex flex-rows justify-center mt-10 lg:mt-0">
                {(current === 0 || current === 1) && (
                  <ul className="text-white  bg-bg-loginSignUp-custom-color rounded-3xl flex flex-rows ">
                    {Links.map((link) => (
                      <li key={link.id}>
                        <button
                          onClick={link.onclick}
                          to={link.path}
                          className={`${
                            current === link.id
                              ? "bg-login-button-custom-color px-6 py-2 rounded-3xl text-white"
                              : "bg-bg-loginSignUp-custom-color px-6 py-2 rounded-3xl text-white"
                          }`}
                        >
                          {link.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {current === 0 && <LoginForm />}
              {current === 1 && <SignUp />}
            </div>
          </div>
        </div>
      </div>
    );
}
export default Login;
