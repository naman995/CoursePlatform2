import React from "react";
import InputField from "@/components/InputField";
import MainButton from "@/components/MainButton";
import DropDownInputField from "@/components/DropDownInputField";

const CompleteDetails = ({ setCurrent, dispatch, state }) => {
  const [firstName, setFirstName] = React.useState(
    state ? state.firstName : ""
  );
  const [lastName, setLastName] = React.useState(state ? state.lastName : "");

  const updateState = () => {
    dispatch({
      type: "details",
      payload: { firstName: firstName, lastName: lastName },
    });
  };

  return (
    <div className="lg:mx-0 ">
      <div className="flex flex-col items-center mb-20 lg:flex lg:flex-col lg:items-center">
        <p className="text-white font-semibold text-3xl mt-8 lg:text-5xl">
          Complete Details
        </p>
        <div className="flex py-8">
          <p className="text-login-text-custom-color text-center font-light text-lg capitalize">
            Complete The details So we can Verify Your Trainer Account
          </p>
        </div>
        <div>
          <div className="flex flex-col w-[350px] lg:w-[400px]">
            <InputField
              type={"text"}
              placeholder={"First Name"}
              name={"firstName"}
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col w-[350px] lg:w-[400px]">
            <InputField
              type={"text"}
              placeholder={"Last Name"}
              name={"lastName"}
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <MainButton
            text="Next"
            style=" w-[360px] lg:w-96 "
            onClick={() => {
              updateState();
              setCurrent((current) => current + 1);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CompleteDetails;
