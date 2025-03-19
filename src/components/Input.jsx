import React from "react";

const Input = ({label, type = "text", name, value, onChange, required}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        value={value}
        onChange={(e) => onChange(e)}
        name={name}
        required={required}
        className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
      />
    </div>
  );
};

export default Input;
