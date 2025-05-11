import React from "react";
import "./style.css";

const PaymentOption = ({ img, title, border, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center border-4  justify-between w-[350px] mx-auto lg:w-[600px] bg-white rounded-2xl shadow-sm p-6 ${
        border && "border-blue-700"
      } px-10`}
    >
      <div className="flex flex-row items-center">
        <input
          type="radio"
          id="paypal"
          name="payment_method"
          value="paypal"
          className="h-6 w-6 mr-4"
        />
        <span className="text lg:text-3xl font-medium text-gray-800 ">{title}</span>
      </div>
      <img src={img} alt="Payment method logo" className="w-[80px] h-6 mr-4" />
    </button>
  );
};

export default PaymentOption;
