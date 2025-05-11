import React, { useState } from "react";
import CarouselSide from "../components/CarouselSide";
import OTP from "../components/OTP";
import { Routes, Route, Outlet } from "react-router-dom";
import Verification from "../components/Verification";
import SubmitDocument from "../components/SubmitDocument";
import CompleteDetails from "../components/CompleteDetails";
import AccountType from "../components/AccountType";
import { useReducer } from "react";

import auth from "@/apis/auth";
// import EditEmail from "../components/EditEmail";

const initialState = {
  accountType: null,
  firstName: null,
  lastName: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "accountType":
      return { ...state, accountType: action.payload };
    case "details":
      return { ...state, firstName: action.payload.firstName, lastName: action.payload.lastName };
  }
}

const AuthFLow = () => {
  const [current, setCurrent] = useState(0);

  const [state, dispatch] = useReducer(reducer, initialState);

  const createAccount = async () => {
    const data = await auth.updateAccount(state);

    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="bg-login-background-custom-color h-full lg:h-screen lg:flex lg:items-center lg:justify-center">
      <div className="flex flex-col lg:flex lg:flex-row lg:justify-evenly w-[100%] h-[70%]  ">
        <div>
          <div className="">
            <div className="flex flex-rows justify-center">
              {/* {current === 0 && (
                <OTP setCurrent={setCurrent} current={current} />
              )} */}
              {/* {current === 1 && <EditEmail setCurrent={setCurrent} current={current} />} */}
              {current === 0 && (
                <CompleteDetails
                  setCurrent={setCurrent}
                  current={current}
                  dispatch={dispatch}
                  state={state}
                />
              )}
              {current === 1 && (
                <AccountType
                  setCurrent={setCurrent}
                  current={current}
                  dispatch={dispatch}
                  state={state}
                  final={createAccount}
                />
              )}
              {/* {state.accountType === "trainer" ? (
                <>
                  {current === 3 && (
                    <SubmitDocument
                      setCurrent={setCurrent}
                      current={current}
                      dispatch={dispatch}
                      state={state}
                    />
                  )}
                  {current === 4 && (
                    <Verification
                      setCurrent={setCurrent}
                      current={current}
                      dispatch={dispatch}
                      state={state}
                    />
                  )}
                </>
              ) : (
                <></>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthFLow;
