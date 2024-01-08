import React, { useState } from "react";

function InputControl(props) {
  return (
    <div className="  h-[60px] flex flex-col ">
      <label htmlFor={props.id} className="text-left  w-fit text-lg font-[600]">
        {props.label}
      </label>
      <input
        {...props}
        className="w-full outline-none  border-b-2 border-b-slate-600"
      />
    </div>
  );
}

export default InputControl;
