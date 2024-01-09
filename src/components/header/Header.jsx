import { useContext, useEffect, useState } from "react";
import IMG_LOGO from "../../assets/png-transparent-swiggy-hd-logo-thumbnail-removebg-preview.png";
import { Link } from "react-router-dom";
import UserContext from "../../utils/UserContext";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import Login from "../forms/Login";
import SignUp from "../forms/SignUp";
const Header = () => {
  const { loggedInUser, loggedInStatus } = useContext(UserContext);

  const cartItems = useSelector((store) => store.cart);
  const { formatted } = useSelector((store) => store.location.address);
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [showSignUpPage, setShowSignUpPage] = useState(false);

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        console.log("loggedOut");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {}, []);
  return (
    <>
      {showSignUpPage && (
        <SignUp
          setShowLoginPage={setShowLoginPage}
          setShowSignUpPage={setShowSignUpPage}
        />
      )}
      {showLoginPage && (
        <Login
          setShowLoginPage={setShowLoginPage}
          setShowSignUpPage={setShowSignUpPage}
        />
      )}
      <div className="w-full h-[66px] bg-white px-[5rem] flex items-center justify-between border-b-[1px] border-[#d8d7d7] shadow-[0_7px_25px_-15px_rgba(0,0,0,0.3)] absolute top-0 z-50">
        <ul className="flex gap-5 items-center">
          {" "}
          <li>
            <Link to={"/home"}>
              {" "}
              <img src={IMG_LOGO} alt="" className="h-[40px]" />
            </Link>
          </li>
          <li className="cursor-pointer font-[600]">
            <span>
              {" "}
              {formatted} <i className="fa-solid fa-caret-down"></i>
            </span>
          </li>
        </ul>
        <ul className="flex gap-5 items-center">
          <li className="bg-[#FC8112] text-white rounded-md px-3 py-1 font-[600]">
            {" "}
            <Link to={"/grocery"}>Grocery</Link>
          </li>
          <li>
            {" "}
            <Link to={"/home"}>Home</Link>
          </li>
          <li>
            {" "}
            <Link to={"/about"}>About</Link>
          </li>
          <li>
            <Link to={"/Cart"}>
              <i className="fa-solid fa-cart-shopping"></i> (
              {cartItems.listOfItems.length})
            </Link>
          </li>
          <li>
            <Link to={"/help"}>
              <i className="fa-solid fa-phone"></i> Help
            </Link>
          </li>
          <li>
            {loggedInStatus ? (
              <span>
                Welcome
                <span className="text-lg font-[600]"> {loggedInUser}</span>
              </span>
            ) : (
              <button onClick={() => setShowSignUpPage(true)}>Sign In</button>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
