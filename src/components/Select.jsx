import React from "react";

const Select = ({ label, options, value, onChange, name, required = false }) => {
  return (
    <div className="w-full">
      <label
        htmlFor="select-input"
        className="block mb-2 text-lg font-medium text-gray-900"
      >
        {label}
      </label>
      {options.length === 0 ? (
        <div
          className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
        >
          Loading...
        </div>
      ) : (
        <select
          id="select-input"
          value={value}
          required={required}
          name={name}
          onChange={(e) => onChange(e, name)}
          className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
        >
          <option value="">Select an Option</option>
          {options.map((item) => (
            <option value={item._id}>{item.name}</option>
          ))}
        </select>
      )}
    </div>
  );
};

export default Select;
