import React from "react";

export const Step = ({
  i,
  index,
  text,
  setIndex,
  status,
  disabled,
  onClick,
}) => {
  return (
    <div className="cursor-pointer">
      {i === index || (i === index && status) ? (
        <div
          onClick={() => {
            if (!disabled) return;
            onClick();
          }}
          className="p-2 flex-1 inline-flex items-center gap-3"
        >
          <p className="px-4 p-2 text-lg rounded-xl bg-blue-500 text-white font-bold">
            {i}
          </p>
          <p className="text-2xl font-bold text-gray-900">{text}</p>
        </div>
      ) : status ? (
        <div
          onClick={() => {
            if (!disabled) return;
            onClick();
          }}    
          className="hidden lg:inline-flex p-2 flex-1 items-center gap-3"
        >
          <p className="px-4 p-2 text-lg rounded-xl bg-blue-200 text-blue-500">
            {i}
          </p>
          <p className="text-2xl text-gray-900">{text}</p>
        </div>
      ) : (
        <div
          onClick={() => {
            if (!disabled) return;
            onClick();
          }}
          className="p-2 flex-1 hidden lg:inline-flex items-center gap-3"
        >
          <p className="px-4 p-2 text-lg rounded-xl bg-gray-300 text-gray-600 font-bold">
            {i}
          </p>
          <p className="text-2xl text-gray-900">{text}</p>
        </div>
      )}
    </div>
  );
};
