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
  const [showLogout, setShowLogout] = useState(false);

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
      <div className=" max-md:px-1 w-full h-[66px] bg-white px-[5rem] flex items-center justify-between border-b-[1px] border-[#d8d7d7] shadow-[0_7px_25px_-15px_rgba(0,0,0,0.3)] absolute top-0 z-50">
        <ul className="flex gap-5 items-center">
          {" "}
          <li className="flex flex-row font-[600] justify-center items-center gap-3">
            <Link to={"/home"}>
              {" "}
              <img src={IMG_LOGO} alt="" className="h-[40px] max-md:h-[30px]" />
            </Link>
            <span>
              {" "}
              {formatted} <i className="fa-solid fa-caret-down"></i>
            </span>
          </li>
          <li className="cursor-pointer font-[600]"></li>
        </ul>
        <ul className="flex gap-5 items-center">
          <li className="bg-[#FC8112] text-white rounded-md px-3 py-1 font-[600] max-md:hidden">
            {" "}
            <Link to={"/grocery"}>Grocery</Link>
          </li>
          <li className="max-md:hidden">
            {" "}
            <Link to={"/home"}>Home</Link>
          </li>
          <li className="max-md:hidden">
            {" "}
            <Link to={"/about"}>About</Link>
          </li>
          <li className="max-md:hidden">
            <Link to={"/Cart"}>
              <i className="fa-solid fa-cart-shopping"></i> (
              {cartItems.listOfItems.length})
            </Link>
          </li>
          <li className="max-md:hidden">
            <Link to={"/help"}>
              <i className="fa-solid fa-phone"></i> Help
            </Link>
          </li>
          <li>
            {loggedInStatus ? (
              <div
                className="relative max-md:text-xl"
                onMouseEnter={() => setShowLogout(true)}
                onMouseLeave={() => setShowLogout(false)}
              >
                <div>
                  Hello,
                  <span className="text-lg max-md:text-xl font-[600]"> {loggedInUser}</span>
                </div>
                <div
                  className={`h-full w-full absolute top-[100%] left-0 F duration-300 ${
                    showLogout ? `visible` : `hidden`
                  }`}
                >
                  {" "}
                  <button
                    className="w-full h-full text-white bg-[#FC8112] rounded-lg"
                    onClick={() => {
                      handleLogOut();
                      setShowLogout(false);
                    }}
                  >
                    Log Out
                  </button>
                </div>
              </div>
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
