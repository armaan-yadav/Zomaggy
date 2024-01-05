import { useDispatch, useSelector } from "react-redux";
import { IMAGE_LINK } from "../../utils/constants";
import { addItem } from "../../utils/redux/cartSlice";
import { useContext, useEffect, useState } from "react";
import VegNonVegSymbol from "../../utils/VegNonVegSymbol";
import UserContext from "../../utils/UserContext";
import AddCountRemoveBtn from "../../utils/AddCountRemoveBtn";

const RestrauntCategoryItem = ({ item, setRatingColorFunction, isActive }) => {
  const { info } = item?.card;
  const cartItems = useSelector((state) => state.cart);
  const dispatcher = useDispatch();
  const [alreadyInCart, setAlreadyInCart] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  const checkAlreadyInCart = (info) => {
    const temp = cartItems.listOfItems.find((item) => {
      {
        item.info.id === info.id && setItemCount(item.count);
      }
      return item.info.id === info.id;
    });
    if (temp) setAlreadyInCart(true);
    else setAlreadyInCart(false);
  };
  const { currentRestraunt } = useContext(UserContext);
  const { id } = currentRestraunt;

  useEffect(() => {
    checkAlreadyInCart(info);
  }, [cartItems]);

  return (
    isActive && (
      <div className="text-[1rem]  flex flex-row justify-between border-b-2 border-[#bcbcbc] my-4 pb-4 ">
        <div className="w-[80%]">
          <VegNonVegSymbol info={info} />

          <h1 className="text-lg">{info?.name}</h1>
          {info.ratings.aggregatedRating.rating ? (
            <div
              className={`text-[.8rem] flex  items-center gap-1  text-gray-400`}
            >
              <h1
                className={`${setRatingColorFunction(
                  info.ratings.aggregatedRating.rating
                )}`}
              >
                <i className="fa-solid fa-star"></i>{" "}
                {info?.ratings?.aggregatedRating?.rating} ,{" "}
              </h1>
              <h1> {info?.ratings?.aggregatedRating?.ratingCount} </h1>
            </div>
          ) : (
            <div className="text-[.8rem] flex  items-center gap-1 text-gray-400">
              <i className="fa-solid fa-star"></i> <h1>No Ratings</h1>
            </div>
          )}
          <h1 className="text-md">
            ₹{" "}
            {item.card.info.price
              ? item.card.info.price / 100
              : item.card.info.defaultPrice / 100}
            /-
          </h1>
          <h1 className="text-sm font-[300] text-[#7e7e7e]">
            {item?.card?.info?.description}
          </h1>
        </div>
        <div className="h-fit w-fit flex flex-col items-center relative ">
          <div className=" w-[118px] h-[96px]  rounded-xl overflow-hidden relative ">
            <img
              src={IMAGE_LINK + item?.card?.info?.imageId}
              className="h-full w-full object-cover"
              alt=""
            />
          </div>

          {alreadyInCart && itemCount > 0 ? (
            <div className="absolute w-[80%] bottom-[-10%]">
              {" "}
              <AddCountRemoveBtn info={info} itemCount={itemCount} id={id} />
            </div>
          ) : (
            <div
              className="w-[80%] text-[#60B247] border-[1.5px] text-center border-gray-300 bg-white rounded-lg shadow-sm absolute bottom-[-10%] hover:shadow-md cursor-pointer"
              onClick={(e) => {
                dispatcher(addItem({ info, id }));
              }}
            >
              Add +
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default RestrauntCategoryItem;
