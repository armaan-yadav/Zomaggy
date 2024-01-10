const Shimmer = () => {
  return (
    <>
      <div className="w-full  px-[5rem] mt-[120px] bg-white max-md:px-2">
        <div className="grid grid-cols-4 gap-4 max-md:grid-cols-1 ">
          {Array(8)
            .fill("")
            .map((e, index) => {
              return (
                <div
                  className=" w-[250px] h-[325px] max-md:w-full  rounded-xl flex flex-col gap-4"
                  key={index}
                >
                  <div className="w-full h-[50%] shimmer-effect"></div>
                  <div className="w-[70%] h-[17px] shimmer-effect"></div>
                  <div className="w-[30%] h-[17px] shimmer-effect"></div>
                  <div className="w-[50%] h-[17px] shimmer-effect"></div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Shimmer;
