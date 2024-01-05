import { createContext } from "react";

const UserContext = createContext({
  loggedInUser: "Mini",
  currentRestraunt: {},
});
export default UserContext;
