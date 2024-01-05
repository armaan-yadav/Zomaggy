import { useContext, useEffect, useState } from "react";
import IMG_LOGO from "../../assets/png-transparent-swiggy-hd-logo-thumbnail-removebg-preview.png";
import { Link } from "react-router-dom";
import UserContext from "../../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { loggedInUser } = useContext(UserContext);

  const cartItems = useSelector((store) => store.cart);

  useEffect(() => {}, []);
  return (
    <>
      <div className="w-full h-[66px] bg-white px-[5rem] flex items-center justify-between border-b-[1px] border-[#d8d7d7] shadow-[0_7px_25px_-15px_rgba(0,0,0,0.3)] absolute top-0 z-50">
        <ul className="flex gap-5 items-center">
          {" "}
          <li>
            <img src={IMG_LOGO} alt="" className="h-[40px]" />
          </li>
          <li>
            Welcome{" "}
            <span className="font-[700] text-ellipsis">{loggedInUser}</span>
          </li>
        </ul>
        <ul className="flex gap-5 items-center">
          <li>
            {" "}
            <Link to={"/grocery"}>Grocery</Link>
          </li>
          <li>
            {" "}
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            {" "}
            <Link to={"/about"}>About</Link>
          </li>
          <li>
            <Link to={"/Cart"}>Cart ({cartItems.listOfItems.length})</Link>
          </li>
          <li>Help</li>
          <li>Contact</li>
          <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
            {isLoggedIn ? "Log Out" : "Log In"}
          </button>
        </ul>
      </div>
    </>
  );
};

export default Header;
