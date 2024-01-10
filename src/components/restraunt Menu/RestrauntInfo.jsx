import { useContext, useEffect } from "react";
import { IMAGE_LINK } from "../../utils/constants";
import UserContext from "../../utils/UserContext";

const RestrauntInfo = ({ restrauntInfoData, setRatingColorFunction }) => {
  const {
    name,
    cloudinaryImageId,
    cuisines,
    avgRating,
    totalRatingsString,
    sla,
    locality,
    id,
  } = restrauntInfoData;
  // console.log(sla);
  const { lastMileTravelString, slaString } = sla;
  const { setCurrentRestraunt } = useContext(UserContext);
  useEffect(() => {
    setCurrentRestraunt({ name, cloudinaryImageId, locality, id });
  }, []);
  return (
    <div className=" flex w-full gap-4 pb-4 max-md:flex-col">
      <div className="rounded-2xl overflow-hidden object-cover object-center">
        <img
          src={`${IMAGE_LINK + cloudinaryImageId}`}
          alt=""
          className="h-[150px] max-md:w-full object-cover"
        />
      </div>
      <div className=" flex-grow flex  flex-row justify-between items-center text-gray-400  ">
        <div>
          <h1 className="text-3xl font-[600] text-black max-md:font-[700]">
            {name}
          </h1>
          <div className="max-md:text-lg max-md:font-[600] max-md:flex max-md:flex-col max-md:gap-2 ">
            <h1>{cuisines?.join(", ")}</h1>
            <h1>{locality}</h1>
            <h1>
              {lastMileTravelString} , {slaString}
            </h1>
          </div>
        </div>
        <div className="flex  flex-col w-fit rounded-lg justify-center items-center p-1 border-gray-500 border-[1px] bg-white">
          <div
            className={`flex items-center ${setRatingColorFunction(avgRating)}`}
          >
            <h1>
              <i className="fa-solid fa-star"></i> {avgRating}
            </h1>
          </div>
          <div className="w-full h-[1px] bg-[#b6b6b6] my-[5px]"></div>
          <h1 className="text-[11px] ">{totalRatingsString}</h1>
        </div>
      </div>
    </div>
  );
};

export default RestrauntInfo;
