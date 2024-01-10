import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const HeaderBottom = () => {
  const cartItems = useSelector((store) => store.cart);

  useEffect(() => {}, []);
  return navigator.userAgent.match("Android") ? (
    <>
      <div className=" max-md:px-[2px] w-full h-[66px] bg-white px-[5rem] flex items-center justify-between border-b-[1px] border-[#d8d7d7] shadow-[0_15px_5px_15px_rgba(0,0,0,0.3)] fixed bottom-0 z-[100]">
        <ul className="flex gap-5 items-center justify-between  w-full text-xl font-[600]">
          <li className="bg-[#FC8112] text-white rounded-md px-3 py-1 font-[600] ">
            {" "}
            <Link to={"/grocery"}>Grocery</Link>
          </li>
          <li className="">
            {" "}
            <Link to={"/home"}>Home</Link>
          </li>
          <li className="">
            {" "}
            <Link to={"/about"}>About</Link>
          </li>
          <li className="">
            <Link to={"/Cart"}>
              <i className="fa-solid fa-cart-shopping"></i> (
              {cartItems.listOfItems.length})
            </Link>
          </li>
          <li className="">
            <Link to={"/help"}>
              <i className="fa-solid fa-phone"></i> Help
            </Link>
          </li>
        </ul>
      </div>
    </>
  ) : (
    <></>
  );
};

export default HeaderBottom;
