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
  const temp = useRestrauntMenuInfo(cartItems.id);

  return cartItems.total != 0 ? (
    temp ? (
      <div className="pt-[66px] bg-[#E6E8EA] flex items-center justify-around h-[100vh]  max-md:flex-col-reverse">
        <div className="h-[80vh] w-[65%] bg-white   max-md:w-full max-md:px-1"></div>
        <div className="h-[80vh] w-[30%]  p-3 relative bg-white max-md:w-full max-md:px-1">
          <div className="info w-full  flex flex-row gap-2 max-md:flex-col ">
            <div className="h-[75px] w-[75px] rounded-sm overflow-hidden max-md:w-full max-md:h-[100px] ">
              <img
                src={IMAGE_LINK + temp?.cloudinaryImageId}
                alt=""
                className="h-full w-full object-cover "
              />
            </div>
            <div className="flex-1 flex-col flex">
              <span className="text-xl font-[600] max-md:text-3xl ">
                {temp?.name}
              </span>
              <span className="text-sm max-md:text-lg">{temp?.locality}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 h-[80%] overflow-y-scroll py-3 max-md:px-2">
            {" "}
            {temp &&
              cartItems.listOfItems.map((e) => {
                return (
                  <div key={e.info.id} className="">
                    <div className="w-full flex justify-between items-center">
                      <div className="flex gap-2 items-center w-6/12  overflow-auto text-wrap text-sm max-md:text-lg">
                        <VegNonVegSymbol info={e.info} />
                        <h1 className="">{e.info.name}</h1>
                      </div>
                      <div className="relative w-[80px]">
                        <AddCountRemoveBtn
                          info={e.info}
                          id={cartItems.id}
                          itemCount={e.count}
                          extraCSS={`rounded-sm`}
                        />
                      </div>
                      <h1 className="font-[600]">
                        ₹
                        {((e.info.price ? e.info.price : e.info.defaultPrice) /
                          100) *
                          e.count}
                      </h1>
                    </div>
                  </div>
                );
              })}
            <div className="w-full bg-[#E6E8EA] outline-none flex flex-row h-[56px] text-sm items-center px-3 max-md:my-8">
              <i className="fa-solid fa-quote-left mx-2"></i>
              <input
                type="text"
                className="w-full bg-[#E6E8EA] outline-none"
                placeholder="Any Suggestions? We'll pass it on . . ."
              />{" "}
            </div>
          </div>
          <div className="absolute bottom-0 w-full  left-0 h-[40px] px-2 flex  shadow-md items-center max-md:text-xl max-md:font-[600] max-md:justify-between">
            <h1 className="font-[600]">To Pay</h1>
            <h1> ₹{cartItems.total / 100}/-</h1>
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
