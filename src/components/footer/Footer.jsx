import React from "react";

const Footer = () => {
  return (
    <div className="w-full h-[5rem] bg-black text-white flex flex-row items-center justify-between px-5">
      <img
        src="https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Swiggy_logo.svg/2560px-Swiggy_logo.svg.png"
        alt=""
        className="h-[40px]"
      />
      <h1 className="font-[700] text-2xl">@Swiggy 2024</h1>
      <div className="[&>*]:cursor-pointer flex flex-row gap-3">
        <i className="fa-brands fa-instagram"></i>
        <i className="fa-brands fa-twitter"></i>
        <i className="fa-brands fa-facebook"></i>
        <i className="fa-brands fa-whatsapp"></i>
        <i className="fa-brands fa-pinterest"></i>
      </div>
    </div>
  );
};

export default Footer;
