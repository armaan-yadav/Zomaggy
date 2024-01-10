import React, { useContext, useEffect, useState } from "react";
import Footer from "../footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { updateLocation, setAddress } from "../../utils/redux/locationSlice";
import { Link, useNavigate } from "react-router-dom";
import SignUp from "../forms/SignUp";
import Login from "../forms/Login";
import UserContext from "../../utils/UserContext";
import LoadingImage from "../../assets/loading.gif";
import ErrorPopUp from "../../utils/error/ErrorPopUp";
const LandingPage = () => {
  const dispatcher = useDispatch();
  const address = useSelector((store) => store.location.address);
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [showSignUpPage, setShowSignUpPage] = useState(false);
  const { loggedInStatus, loggedInUser } = useContext(UserContext);
  const [error, setError] = useState(false);
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
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (error) => {
        setFetching(false);
        setShowLocateYourself(true);
        setError(true);
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
        dispatcher(setAddress(result.features[0].properties));
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
        {error && (
          <ErrorPopUp
            text={"Google Maps does not have permission to use your location."}
            setError={setError}
          />
        )}
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
        <div className="hero-section flex flex-row min-h-[35rem]  max-md:flex-col max-md:w-full ">
          <div className="w-[60%]  px-10 pt-[5rem]  max-md:w-full max-md:pt-2 max-md:px-2 ">
            <div className="flex w-full flex-row justify-between items-center   max-md:justify-between ">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Swiggy_logo.svg/2560px-Swiggy_logo.svg.png"
                alt=""
                className="h-[60px] max-md:h-[40px]"
              />
              {!loggedInStatus ? (
                <div className="w-fit  bg-green-900 max-md:flex max-md:flex-col ">
                  {" "}
                  <button
                    className="font-[700] px-6 py-2 rounded-sm "
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
                <div className="font-[700] text-white bg-black px-6 py-2 rounded-sm ">
                  Welcome {loggedInUser}
                </div>
              )}
            </div>
            <div className="mt-[5rem] flex flex-col gap-3 ">
              <h1 className="text-[2.8rem] font-[600] animate-bounce max-md:h-[7rem]">
                {text[currentText]}
              </h1>
              <h1 className="text-gray-600 text-xl font-[500]">
                Order food from favourite restaurants near you.
              </h1>
            </div>
            <div className=" w-full flex  items-center mt-[2rem] h-[60px] max-md:mb-5 ">
              <button
                onClick={() => {
                  setShowLocateYourself(false);
                  getLocation();
                }}
                className=" h-full flex-1 py-3 px-5 font-semibold text-lg text-gray-400 border-[1px] rounded-l-md bordr-r-none border-gray-200 border-r-none text-left"
              >
                {showLocateYourself ? (
                  "Click here to locate yourself"
                ) : fetching ? (
                  <span>Fethcing your location.....</span>
                ) : (
                  `Expolore Restraunts in ${address.city}`
                )}
              </button>{" "}
              <button
                className="h-full w-[20%] text-white bg-[#FC8112] text-lg px-5 py-3 rounded-r-md font-semibold border-2 border-[#FC8112] flex justify-center items-center"
                onClick={() => {
                  navigate("/home");
                }}
                disabled={fetching}
              >
                {fetching ? (
                  <img src={LoadingImage} alt="" className="h-[18px] " />
                ) : (
                  `Find Food`
                )}
              </button>
            </div>
            <div className="mt-[2.5rem] max-md:hidden">
              <h1 className="text-lg font-[600] max-md:text-center">
                Popular Cities in India
              </h1>
              <h1 className="flex gap-4 text-md font-[600] text-gray-400 cursor-pointer max-md:grid max-md:grid-cols-3 max-md:gap-1 ">
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
          <div className="w-[40%] max-md:w-full">
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_1340/Lunch1_vlksgq"
              alt=""
              className="h-full w-full object-cover max-md:object-center"
            />
          </div>
        </div>
        <div className="w-full min-h-[20rem] bg-[#2b1e16] flex flex-row justify-around pb-8 max-md:flex-col max-md:px-2">
          <div className="text-white  w-[25%] flex  flex-col items-center justify-center gap-6 max-md:w-full">
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
          <div className="text-white w-[25%] flex  flex-col items-center justify-center gap-6 max-md:w-full">
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
          <div className="text-white w-[25%] flex  flex-col items-center justify-center gap-6 max-md:w-full">
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
        <div className="flex flex-row max-md:flex-col  ">
          <div className="w-[40%] h-[35rem]  flex  flex-col items-left justify-center px-8 gap-7 max-md:w-full max-md:h-fit max-md:py-9">
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
          <div className="w-[60%] h-[35rem] relative overflow-hidden max-md:w-full max-md:h-[25rem]">
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_768,h_978/pixel_wbdy4n"
              alt=""
              className="w-[384px] h-[489px] absolute left-3 -top-10 max-md:left-0 max-md:w-[250px] max-md:h-auto"
            />
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_768,h_978/iPhone_wgconp_j0d1fn"
              alt=""
              className="w-[384px] h-[489px] absolute bottom-0 right-3 max-md:w-[250px] max-md:h-auto max-md:right-0"
            />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
