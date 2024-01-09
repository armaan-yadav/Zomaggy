import React from "react";

const ErrorPopUp = ({ text, setError }) => {
  return (
    <div className="fixed z-50 bottom-0 left-[50%] translate-x-[-50%] bg-[#FC8112] text-white flex flex-row gap-4 items-center px-5 py-3 text-xl font-[400]">
      <span>{text}</span>
      <button className="" onClick={() => setError(false)}>
        <i class="fa-solid fa-x"></i>
      </button>
    </div>
  );
};

export default ErrorPopUp;
