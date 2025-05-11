import React from "react";
import Select from "react-select";

const customStyles = {
  control: (base, state) => ({
    ...base,
    border: "none", // here you can remove the border
    boxShadow: state.isFocused ? "0 0 0 1px #0070f3" : null,
    "&:hover": {
      border: "none", // also remove border on hover
    },
  }),
};

function CoustomSelect({
  name,
  onChange,
  options,
  value,
  className,
  placeholder,
}) {
  const defaultValue = (options, value) => {
    return options ? options.find((option) => option.value === value) : "";
  };

  return (
    <div className={`appearance-none block w-full font-semibold text-gray-700 p-2   border-gray-300 border-2 rounded-lg leading-tight focus:outline-none focus:bg-white ${className}`}>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="placeholder-gray-400 focus:outline-none focus:bg-white w-full py-1"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CoustomSelect;
