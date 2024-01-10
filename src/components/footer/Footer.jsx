import React from "react";

const Footer = () => {
  return (
    <div className="w-full h-[5rem] bg-black text-white flex flex-row items-center justify-between px-5 max-md:flex-col max-md:gap-3 max-md:h-fit max-md:py-2">
      <img
        src="https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Swiggy_logo.svg/2560px-Swiggy_logo.svg.png"
        alt=""
        className="h-[40px] max-md:h-[20px]"
      />
      <h1 className="font-[700] text-2xl max-md:hidden">@Swiggy 2024</h1>
      <div className="[&>*]:cursor-pointer flex flex-row gap-3 max-md:gap-6">
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
