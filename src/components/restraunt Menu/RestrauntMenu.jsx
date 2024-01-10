import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RestrauntInfo from "./RestrauntInfo";
import ShimmerMenu from "./ShimmerMenu";
import useRestrauntMenuInfo from "../../utils/useRestrauntMenuInfo";
import useRestrauntMenuItems from "../../utils/useRestrauntMenuItems";
import RestrauntCategory from "./RestrauntCategory";
import { alpha, styled } from "@mui/material/styles";
import { pink, red, green } from "@mui/material/colors";
import Switch from "@mui/material/Switch";

const RestrauntMenu = () => {
  const { resId } = useParams();
  const restrauntInfo = useRestrauntMenuInfo(resId);
  const restrauntMenuItems = useRestrauntMenuItems(resId);
  const [showVegOnly, setShowVegOnly] = useState(false);
  const [showNonVegOnly, setShowNonVegOnly] = useState(false);
  const [showScrollTopBtn, setShowScrollTopBtn] = useState(false);
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const PinkSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: red[600],
      "&:hover": {
        backgroundColor: alpha(red[600], theme.palette.action.hoverOpacity),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: red[600],
    },
  }));
  const setRatingColorFunction = (avgRating) => {
    if (avgRating >= 4.0) {
      return "text-green-500";
    } else if (avgRating < 4.0 && avgRating >= 3.3) {
      return "text-yellow-500";
    } else if (avgRating < 3.3) {
      return "text-red-400";
    }
  };
  const toggleVisibility = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setShowScrollTopBtn(true);
    } else {
      setShowScrollTopBtn(false);
    }
  };
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);
  return restrauntMenuItems && restrauntInfo ? (
    <>
      <div className="px-[15rem] pt-5 bg-[#FFFFFF] mt-[66px]  max-md:px-2">
        <RestrauntInfo
          restrauntInfoData={restrauntInfo}
          setRatingColorFunction={setRatingColorFunction}
        />
        <div className="border-b-[2px] border-dashed  border-gray-300"></div>
        <div className="w-full flex">
          <div>
            <span>Veg Only</span>{" "}
            <Switch
              {...label}
              onChange={(e) => {
                setShowVegOnly(e.target.checked);
              }}
            />
          </div>
          <div>
            <span>Non-Veg Only</span>{" "}
            <Switch
              {...label}
              color="primary"
              onChange={(e) => {
                setShowNonVegOnly(e.target.checked);
              }}
            />
          </div>
        </div>
        <div>
          {restrauntMenuItems?.map((e, index) => {
            const { itemCards, title } = e?.card?.card;
            if (itemCards)
              return (
                <RestrauntCategory
                  title={title}
                  itemCards={itemCards}
                  key={index}
                  setRatingColorFunction={setRatingColorFunction}
                  showVegOnly={showVegOnly}
                  showNonVegOnly={showNonVegOnly}
                />
              );
          })}
        </div>
      </div>
      {showScrollTopBtn && (
        <button
          className="fixed bottom-5 right-10"
          onClick={() => handleScrollTop()}
        >
          TOP
        </button>
      )}
    </>
  ) : (
    <ShimmerMenu />
  );
};

export default RestrauntMenu;
