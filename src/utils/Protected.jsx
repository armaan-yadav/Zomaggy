import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "./UserContext";

const Protected = ({ children }) => {
  const { loggedInStatus } = useContext(UserContext);

  // if (loggedInStatus) {
  //   // console.log("child");
    return children;
  // } else {
  //   // console.log("nav");
  //   return <Navigate to={"/"}></Navigate>;
  // }
};

export default Protected;
