import React from "react";
import { useField } from "formik";

const InputField = ({ name, type, placeholder, icon }) => {
  const [field, meta] = useField(name);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        {icon}
      </div>
      <input
        {...field}
        type={type}
        className="bg-bg-loginSignUp-custom-color border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
