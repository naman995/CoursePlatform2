import React from "react";
import MainButton from "@/components/MainButton";

function AccountType({ dispatch, state, setCurrent, final }) {
  return (
    <div className="lg:mx-0 ">
      <div className="flex flex-col items-center mb-20 lg:flex lg:flex-col lg:items-center">
        <p className="text-white font-semibold text-3xl mt-8 lg:text-5xl">
          Account Type
        </p>
        <div className="flex py-8">
          <p className="text-login-text-custom-color text-center font-light text-lg capitalize">
            Select Your Account Type
          </p>
        </div>
        <div className="flex flex-row w-[350px] lg:w-[400px] space-x-4 mb-4">
          <button
            className={`w-full border border-gray-100 rounded-lg flex items-center justify-center py-12 ${
              state && state.accountType === "trainer"
                ? "bg-login-button-custom-color"
                : ""
            }`}
            onClick={() =>
              dispatch({ type: "accountType", payload: "trainer" })
            }
          >
            <p className="text-white font-semibold">Trainer</p>
          </button>
          <button
            className={`w-full border border-gray-100 rounded-lg flex items-center justify-center py-12 ${
              state && state.accountType === "student"
                ? "bg-login-button-custom-color"
                : ""
            }`}
            onClick={() =>
              dispatch({ type: "accountType", payload: "student" })
            }
          >
            <p className="text-white font-semibold">Student</p>
          </button>
        </div>
        <div>
          <MainButton text="Next" style=" w-[360px] lg:w-96 " onClick={final} />
        </div>
      </div>
    </div>
  );
}

export default AccountType;
