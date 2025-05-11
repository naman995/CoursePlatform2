import React, { useState } from "react";

const DropdownOption = ({ text, type = "checkbox", onClick }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
    onClick(!isChecked);
  };

  return (
    <div className="flex items-center justify-between cursor-pointer px-6">
      <label
        className="text-base font-light text-white capitalize"
        htmlFor="Rating"
      >
        {text}
      </label>
      <input
        onChange={handleChange}
        name="text"
        id="green-checkbox"
        type={type}
        checked={isChecked}
        value=""
        className="w-5 h-5 text-green-600 focus:ring-green-500 border-2 checked:ring-green-600"
      />
    </div>
  );
};

export default DropdownOption;
