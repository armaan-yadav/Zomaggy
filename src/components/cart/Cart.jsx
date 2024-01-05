import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VegNonVegSymbol from "../../utils/VegNonVegSymbol";
import useRestrauntMenuInfo from "../../utils/useRestrauntMenuInfo";
import AddCountRemoveBtn from "../../utils/AddCountRemoveBtn";
import { IMAGE_LINK } from "../../utils/constants";
import EmptyCart from "./EmptyCart";
import ShimmerCart from "./ShimmerCart";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart);
  // const temp = useRestrauntMenuInfo(cartItems.id);
  const temp = useRestrauntMenuInfo(12);

  return cartItems.total != 0 ? (
    temp ? (
      <div className="pt-[66px] bg-[#E6E8EA] flex items-center justify-around h-[100vh]  ">
        <div className="h-[80vh] w-[65%] bg-white "></div>
        <div className="h-[80vh] w-[30%]  p-3 relative bg-white ">
          <div className="info w-full  flex flex-row gap-2">
            <div className="h-[75px] w-[75px] rounded-sm overflow-hidden  ">
              <img
                src={IMAGE_LINK + temp?.cloudinaryImageId}
                alt=""
                className="h-full w-full object-cover "
              />
            </div>
            <div className="flex-1 flex-col flex">
              <span className="text-xl font-[600]">{temp?.name}</span>
              <span className="text-sm">{temp?.locality}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 h-[80%] overflow-y-scroll py-3">
            {" "}
            {temp &&
              cartItems.listOfItems.map((e) => {
                return (
                  <div key={e.info.id}>
                    <div className="w-full flex justify-between items-center">
                      <div className="flex gap-2 items-center w-6/12  overflow-auto text-wrap text-sm">
                        <VegNonVegSymbol info={e.info} />
                        <h1>{e.info.name}</h1>
                      </div>
                      <div className="relative w-[80px]">
                        <AddCountRemoveBtn
                          info={e.info}
                          id={cartItems.id}
                          itemCount={e.count}
                          extraCSS={`rounded-sm`}
                        />
                      </div>
                      <h1>
                        ₹
                        {((e.info.price ? e.info.price : e.info.defaultPrice) /
                          100) *
                          e.count}
                      </h1>
                    </div>
                  </div>
                );
              })}
            <div className="w-full bg-[#E6E8EA] outline-none flex flex-row h-[56px] text-sm items-center px-3">
              <i className="fa-solid fa-quote-left mx-2"></i>
              <input
                type="text"
                className="w-full bg-[#E6E8EA] outline-none"
                placeholder="Any Suggestions? We'll pass it on . . ."
              />{" "}
            </div>
          </div>
          <div className="absolute bottom-0 w-full bg-green-300 left-0 h-[40px] px-2 flex items-center justiy-between">
            <span className="font-[600]">To Pay</span>
            <span>{cartItems.total / 100}</span>
          </div>
        </div>
      </div>
    ) : (
      <ShimmerCart />
    )
  ) : (
    <EmptyCart />
  );
};

export default Cart;
