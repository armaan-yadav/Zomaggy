import { useEffect, useState } from "react";
import RestrauntCategoryItem from "./RestrauntCategoryItem";
const RestrauntCategory = ({
  title,
  itemCards,
  setRatingColorFunction,
  showVegOnly,
  showNonVegOnly,
}) => {
  const [isActive, setIsActive] = useState(true);
  const [length, setLength] = useState(0);
  const [choice, setChoice] = useState("all");

  useEffect(() => {
    if (showVegOnly && showNonVegOnly == false) {
      setLength(
        itemCards.filter(
          (e) => e.card.info.itemAttribute.vegClassifier == "VEG"
        ).length
      );
      setChoice("veg");
    } else if (showNonVegOnly && showVegOnly == false) {
      setLength(
        itemCards.filter(
          (e) => e.card.info.itemAttribute.vegClassifier == "NONVEG"
        ).length
      );
      setChoice("nonveg");
    } else if (showNonVegOnly == false && showVegOnly == false) {
      setLength(itemCards.length);
      setChoice("all");
    } else if (showNonVegOnly && showNonVegOnly) {
      setLength(0);
      setChoice("none");
    }
  }, [showNonVegOnly, showVegOnly]);

  // switch case for selecting menu //

  const renderSwitch = (param) => {
    switch (param) {
      case "veg":
        return itemCards
          .filter(
            (e, index) => e.card.info.itemAttribute.vegClassifier == "VEG"
          )
          .map((e, index) => (
            <RestrauntCategoryItem
              key={index}
              item={e}
              isActive={isActive}
              setRatingColorFunction={setRatingColorFunction}
            />
          ));
      case "nonveg":
        return itemCards
          .filter((e) => e.card.info.itemAttribute.vegClassifier == "NONVEG")
          .map((e, index) => (
            <RestrauntCategoryItem
              key={index}
              item={e}
              isActive={isActive}
              setRatingColorFunction={setRatingColorFunction}
            />
          ));
      case "all":
        return itemCards.map((e, index) => (
          <RestrauntCategoryItem
            key={index}
            item={e}
            isActive={isActive}
            setRatingColorFunction={setRatingColorFunction}
          />
        ));
    }
  };
  return (
    <>
      <div className="text-2xl font-[600] ">
        <div
          className="title flex w-full font-[700] my-8 justify-between cursor-pointer"
          onClick={() => setIsActive(!isActive)}
        >
          <h1>{`${title} (${length})`}</h1>
          <h1 className="cursor-pointer">
            {isActive ? (
              <i className="fa-solid fa-caret-up"></i>
            ) : (
              <i className="fa-solid fa-caret-down"></i>
            )}
          </h1>
        </div>
        {renderSwitch(choice)}
        <div className="h-[20px] w-full bg-[#F1F1F7]"></div>
      </div>
    </>
  );
};

export default RestrauntCategory;
