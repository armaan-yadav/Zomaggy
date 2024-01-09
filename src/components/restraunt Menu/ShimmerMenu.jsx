const ShimmerMenu = () => {
  return (
    <>
      <div className="px-[15rem] pt-[5rem] bg-white ">
        <div className="border-b-[2px] border-dashed flex w-full gap-4 pb-8 border-gray-300">
          <div className="rounded-2xl h-[200px] w-[200px] shimmer-effect"></div>
          <div className=" flex-grow flex  flex-row justify-between items-center text-gray-400  ">
            <div className="flex flex-col items-start w-full gap-3">
              <div className="h-[10px] w-[30%] shimmer-effect"></div>
              <div className="h-[10px] w-[40%] shimmer-effect"></div>
            </div>
            <div className=" w-[50px] h-[50px]  shimmer-effect rounded-xl"></div>
          </div>
        </div>
        <div>
          <div className="w-[40%] h-[30px] shimmer-effect mt-10"></div>

          {Array(2)
            .fill("")
            .map((e, index) => {
              return (
                <div
                  className="flex flex-row w-full mt-10 justify-between"
                  key={index}
                >
                  <div className="h-[20px] w-[20%] shimmer-effect"></div>
                  <div className="w-[118px] h-[96px] shimmer-effect rounded-xl"></div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default ShimmerMenu;
