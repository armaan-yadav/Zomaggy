const VegNonVegSymbol = ({ info }) => {
  return (
    <div
      className={`h-[12px] w-[12px] border-[1px] flex items-center justify-center my-2  ${
        info.itemAttribute.vegClassifier === "VEG"
          ? "border-green-400"
          : "border-red-400"
      }`}
    >
      <div
        className={`h-[7px] w-[7px] rounded-[50%] ${
          info.itemAttribute.vegClassifier === "VEG"
            ? "bg-green-400"
            : "bg-red-400"
        }`}
      ></div>
    </div>
  );
};

export default VegNonVegSymbol;
