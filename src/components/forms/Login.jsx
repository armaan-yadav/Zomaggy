import React, { useState } from "react";
import InputControl from "./InputControl";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
const Login = ({ setShowSignUpPage, setShowLoginPage }) => {
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const navigate = useNavigate();
  const onFormSubmit = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill All Fields");
      return;
    }
    setSubmitDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then((response) => {
        const user = response.user;
        setSubmitDisabled(false);
        // navigate("/");
        setShowLoginPage(false);
        setShowSignUpPage(false);
      })
      .catch((error) => {
        setSubmitDisabled(false);
        setErrorMsg(error.message);
      });
  };
  return (
    <div className="fixed top-0 right-0 w-[35%] min-h-full  bg-white p-10 z-[100] shadow-2xl">
      <button
        className="absolute top-5 left-4 text-2xl"
        onClick={() => {
          setShowLoginPage(false);
          setShowSignUpPage(false);
        }}
      >
        <i className="fa-solid fa-x  text-gray-500"></i>
      </button>
      <div className="w-full  flex flex-row justify-between">
        <div className="flex flex-col">
          <span className="text-[2.2rem] font-[600]">Login</span>
          <button
            className="text-sm"
            onClick={() => {
              setShowLoginPage(false);
              setShowSignUpPage(true);
            }}
          >
            or<span className="text-[#FC8112]"> click here to sign up</span>
          </button>
          <span className="text-[2rem]">
            <i className="fa-solid fa-grip-lines"></i>
          </span>
        </div>
        <div>
          <img
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
            alt=""
            className="h-[100px]"
          />
        </div>
      </div>
      <form
        className="mt-10 flex flex-col gap-3 text-center"
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          onFormSubmit();
        }}
      >
        <div>
          {" "}
          <InputControl
            label={"Email"}
            id={"email"}
            type={"email"}
            onChange={(event) => {
              setValues((prev) => ({
                ...prev,
                email: event.target.value,
              }));
            }}
          />
          <InputControl
            label={"Password"}
            id={"password"}
            type={"password"}
            onChange={(event) => {
              setValues((prev) => ({
                ...prev,
                pass: event.target.value,
              }));
            }}
          />
        </div>

        <span className="text-left w-full text-md font-[600] text-red-600">
          {errorMsg}
        </span>

        <button
          type="submit"
          className="w-full  bg-[#FC8112] text-white py-3 font-[600] mt-10 disabled:bg-[#b35d11] "
          disabled={submitDisabled}
        >
          Login
        </button>
        <div className="text-sm  text-left">
          By clicking on Login, I accept the Terms & Conditions & Privacy Policy
        </div>
      </form>
    </div>
  );
};

export default Login;
