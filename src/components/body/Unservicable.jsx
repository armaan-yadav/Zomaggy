import React from "react";
import UnservicableIMG from "../../assets/location_unserviceable.avif";
const Unservicable = () => {
  return (
    <div className="w-full px-[5rem] mt-[66px] flex items-center justify-center flex-col">
      <img src={UnservicableIMG} alt="" className="h-[400px]" />
      <div className="flex flex-col items-center gap-4">
        <span className="text-2xl font-[700]">Location Unserviceable</span>
        <span className="text-center text-md font-[600]">
          We don’t have any services here till now. Try changing location.
        </span>
      </div>
    </div>
  );
};

export default Unservicable;
