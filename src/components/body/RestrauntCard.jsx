import React, { useContext } from "react";
import { IMAGE_LINK } from "../../utils/constants";
import { Link } from "react-router-dom";
import ONE_LOGO from "../..//assets/OneLogoFull_3x.png";

const RestrauntCard = ({ resData }) => {
  const { name, cloudinaryImageId, cuisines, avgRating, sla, id } =
    resData.info;
  const { slaString, lastMileTravelString } = sla;
  return (
    <Link to={`restraunts/${id}`}>
      <div className="w-[250px] h-[325px] group ">
        <div className="w-full h-[50%] overflow-hidden object-center rounded-xl ">
          <img
            src={`${IMAGE_LINK + cloudinaryImageId}`}
            alt=""
            className="group-hover:scale-[1.1] duration-200"
          />
        </div>
        <div className=" w-full ">
          <h1 className="text-[1.15rem] font-[700]">{name}</h1>
          <div className="text-[.9rem]">
            <div className="w-full flex  justify-between">
              {" "}
              <h1>{avgRating} Stars</h1>
              <h1>{lastMileTravelString}</h1>
            </div>
            <h1>
              {cuisines?.length >= 3
                ? cuisines?.slice(0, 3).join(", ")
                : cuisines?.join(", ")}
            </h1>

            <h1>Estimated Delivery Time : {slaString}</h1>
          </div>
        </div>
      </div>
    </Link>
  );
};

// higher order component //
export const withOneDeliveryLabel = (RestrauntCard) => {
  return (props) => {
    // console.log(props);
    return (
      <>
        <div className="relative">
          {" "}
          <div className="bg-white z-10 text-white w-fit absolute px-3 rounded-lg py-1 top-2 flex  items-center -left-3 ">
            <img src={ONE_LOGO} alt="" className="h-4" />

            <h1 className="text-[#f36f46] text-[10px]">Free Delivery </h1>
          </div>
          <RestrauntCard {...props} />
        </div>
      </>
    );
  };
};

export default RestrauntCard;
