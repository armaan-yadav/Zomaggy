import React, { useContext, useEffect, useState } from "react";
import Footer from "../footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { updateLocation, setCity } from "../../utils/redux/locationSlice";
import { Link, useNavigate } from "react-router-dom";
import SignUp from "../forms/SignUp";
import Login from "../forms/Login";
import UserContext from "../../utils/UserContext";
const LandingPage = () => {
  const dispatcher = useDispatch();
  const city = useSelector((store) => store.location.city.city);
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [showSignUpPage, setShowSignUpPage] = useState(false);
  const { loggedInStatus, loggedInUser } = useContext(UserContext);
  const navigate = useNavigate();

  const text = [
    "Cooking Went Wrong?",
    "Unexpected Guests?",
    "Movie Marathon?",
    "Game Night?",
    "Late night at offcie?",
    "Hungry?",
  ];
  const [currentText, setCurrentText] = useState(0);
  setTimeout(() => {
    currentText < 5 ? setCurrentText(currentText + 1) : setCurrentText(0);
  }, 1800);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [fetching, setFetching] = useState(false);
  const [showLocateYourself, setShowLocateYourself] = useState(true);

  const getLocation = () => {
    setFetching(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("User Location:", { latitude, longitude });
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (error) => {
        console.error("Error retrieving user location:", error);
      }
    );
  };
  const handleButtonClick = () => {
    var requestOptions = {
      method: "GET",
    };

    fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=e68a4284a94e4fe19bec0ed569a811bc`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        dispatcher(setCity(result.features[0].properties));
        setFetching(false);
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    dispatcher(updateLocation({ latitude, longitude }));
    latitude && longitude && handleButtonClick();
  }, [latitude, longitude]);
  useEffect(() => {}, []);
  return (
    <>
      <div>
        <div className="hero-section flex flex-row min-h-[35rem] ">
          <div className="w-[60%]  px-10 pt-[5rem]">
            <div className="flex w-full flex-row justify-between items-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Swiggy_logo.svg/2560px-Swiggy_logo.svg.png"
                alt=""
                className="h-[60px]"
              />
              {!loggedInStatus ? (
                <div>
                  {" "}
                  <button
                    className="font-[700] px-6 py-2 rounded-sm"
                    onClick={() => {
                      setShowLoginPage(true);
                      setShowSignUpPage(false);
                    }}
                  >
                    Login
                  </button>
                  <button
                    className="font-[700] text-white bg-black px-6 py-2 rounded-sm "
                    onClick={() => {
                      setShowLoginPage(false);
                      setShowSignUpPage(true);
                    }}
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <h1 className="font-[700] text-white bg-black px-6 py-2 rounded-sm ">
                  Welcome {loggedInUser}
                </h1>
              )}
            </div>
            <div className="mt-[5rem] flex flex-col gap-3">
              <h1 className="text-[2.8rem] font-[600] animate-bounce">
                {text[currentText]}
              </h1>
              <h1 className="text-gray-600 text-xl font-[500]">
                Order food from favourite restaurants near you.
              </h1>
            </div>
            <div className=" w-full flex  items-center mt-[2rem] ">
              <button
                onClick={() => {
                  setShowLocateYourself(false);
                  getLocation();
                }}
                className="flex-1 py-3 px-5 font-semibold text-lg text-gray-400 border-[1px] rounded-l-md bordr-r-none border-gray-200 border-r-none text-left"
              >
                {showLocateYourself ? (
                  "Click here to locate yourself"
                ) : fetching ? (
                  <span>Fethcing your location.....</span>
                ) : (
                  `Expolore Restraunts in ${city}`
                )}
              </button>{" "}
              <button
                className="text-white bg-[#FC8112] text-lg px-5 py-3 rounded-r-md font-semibold border-2 border-[#FC8112]"
                // disabled={!(latitude && longitude)}
                onClick={() => {
                  loggedInStatus ? navigate("/home") : setShowLoginPage(true);
                }}
              >
                Find Food
              </button>
            </div>
            <div className="mt-[2.5rem]">
              <h1 className="text-lg font-[600]">Popular Cities in India</h1>
              <h1 className="flex gap-4 text-md font-[600] text-gray-400 cursor-pointer">
                <span>Mumbai</span>
                <span>Banglore</span>
                <span>Kota</span>
                <span>Ahemdabad</span>
                <span>Pune</span>
                <span>Bengaluru</span>
                <span>Ranchi</span>
                <span>Raipur</span>
                <span>Kollkata</span>
              </h1>
            </div>
          </div>
          <div className="w-[40%] ">
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_1340/Lunch1_vlksgq"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
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
        </div>
        <div className="w-full min-h-[20rem] bg-[#2b1e16] flex flex-row justify-around pb-8 ">
          <div className="text-white  w-[25%] flex  flex-col items-center justify-center gap-6">
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_248,h_376/4x_-_Super_fast_delivery_awv7sn"
              alt=""
              className="h-[200px]"
            />
            <div className="text-center flex  flex-col gap-3">
              {" "}
              <h1 className="font-semibold text-xl">Lightning Fast Delivery</h1>
              <h1 className="text-sm">
                Experience Swiggy's superfast delivery for food delivered fresh
                & on time
              </h1>
            </div>
          </div>
          <div className="text-white w-[25%] flex  flex-col items-center justify-center gap-6">
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_248,h_376/4x_-_Super_fast_delivery_awv7sn"
              alt=""
              className="h-[200px]"
            />
            <div className="text-center flex  flex-col gap-3">
              {" "}
              <h1 className="font-semibold text-xl">Lightning Fast Delivery</h1>
              <h1 className="text-sm">
                Experience Swiggy's superfast delivery for food delivered fresh
                & on time
              </h1>
            </div>
          </div>
          <div className="text-white w-[25%] flex  flex-col items-center justify-center gap-6">
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_248,h_376/4x_-_Super_fast_delivery_awv7sn"
              alt=""
              className="h-[200px]"
            />
            <div className="text-center flex  flex-col gap-3">
              {" "}
              <h1 className="font-semibold text-xl">Lightning Fast Delivery</h1>
              <h1 className="text-sm">
                Experience Swiggy's superfast delivery for food delivered fresh
                & on time
              </h1>
            </div>
          </div>
        </div>
        <div className="flex flex-row ">
          <div className="w-[40%] h-[35rem]  flex  flex-col items-left justify-center px-8 gap-7">
            <div>
              <h1 className="text-[2rem] font-[600]">Restraunts In Pocket</h1>
              <h1 className="text-gray-400 text-sm">
                Order from your favorite restaurants & track on the go, with the
                all-new Swiggy app.
              </h1>
            </div>
            <div className="flex gap-3">
              <img
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_108/play_ip0jfp"
                alt=""
                className="h-[54px] w-[180px]"
              />
              <img
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_108/iOS_ajgrty"
                alt=""
                className="h-[54px] w-[180px]"
              />
            </div>
          </div>
          <div className="w-[60%] h-[35rem] relative overflow-hidden">
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_768,h_978/pixel_wbdy4n"
              alt=""
              className="w-[384px] h-[489px] absolute left-3 -top-10"
            />
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_768,h_978/iPhone_wgconp_j0d1fn"
              alt=""
              className="w-[384px] h-[489px] absolute bottom-0 right-3"
            />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
