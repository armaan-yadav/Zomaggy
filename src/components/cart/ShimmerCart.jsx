import React from "react";

const ShimmerCart = () => {
  return (
    <div className="pt-[66px] bg-[#E6E8EA] flex items-center justify-around h-[100vh]  ">
      <div className="h-[80vh] w-[65%] bg-white "></div>
      <div className="h-[80vh] w-[30%]  p-3 relative bg-white ">
        <div className="info w-full  flex flex-row gap-2">
          <div className="h-[75px] w-[75px] rounded-sm overflow-hidden  shimmer-effect"></div>
          <div className="flex-1 flex-col flex gap-3">
            <div className="h-[10px] w-[30%] shimmer-effect"></div>
            <div className="h-[10px] w-[20%] shimmer-effect"></div>
          </div>
        </div>
        <div className="flex flex-col gap-2 h-[80%]  py-3">
          <div>
            <div className="w-full flex justify-between items-center">
              <div className="flex gap-2 items-center w-6/12   text-wrap text-sm"></div>
            </div>
          </div>
          <div className="flex flex-col w-full gap-6">
            <div className="w-full h-[20px] flex flex-row justify-between">
              <span className="h-[30px] w-[40%] shimmer-effect"></span>
              <span className="h-[20px] w-[20%] shimmer-effect"></span>
              <span className="h-[20px] w-[10%] shimmer-effect"></span>
            </div>
            <div className="w-full h-[20px] flex flex-row justify-between">
              <span className="h-[30px] w-[40%] shimmer-effect"></span>
              <span className="h-[20px] w-[20%] shimmer-effect"></span>
              <span className="h-[20px] w-[10%] shimmer-effect"></span>
            </div>
            <div className="w-full h-[20px] flex flex-row justify-between">
              <span className="h-[30px] w-[40%] shimmer-effect"></span>
              <span className="h-[20px] w-[20%] shimmer-effect"></span>
              <span className="h-[20px] w-[10%] shimmer-effect"></span>
            </div>
            <div className="w-full h-[20px] flex flex-row justify-between">
              <span className="h-[30px] w-[40%] shimmer-effect"></span>
              <span className="h-[20px] w-[20%] shimmer-effect"></span>
              <span className="h-[20px] w-[10%] shimmer-effect"></span>
            </div>
            <div className="w-full h-[20px] flex flex-row justify-between">
              <span className="h-[30px] w-[40%] shimmer-effect"></span>
              <span className="h-[20px] w-[20%] shimmer-effect"></span>
              <span className="h-[20px] w-[10%] shimmer-effect"></span>
            </div>
          </div>
          <div className="w-full h-[40px] shimmer-effect mt-5"></div>
        </div>
        <div className="absolute bottom-0 w-fullleft-0 h-[40px] shimmer-effect"></div>
      </div>
    </div>
  );
};

export default ShimmerCart;
