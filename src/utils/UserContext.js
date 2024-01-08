import { createContext } from "react";

const UserContext = createContext({
  loggedInUser: "",
  loggedInStatus: "",
  currentRestraunt: {},
  location,
});
export default UserContext;
