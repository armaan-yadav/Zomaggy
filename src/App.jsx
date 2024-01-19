import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import useOnlineStatus from "./utils/useOnlineStatus";
import UserContext from "./utils/UserContext";
import { useContext, useEffect, useState } from "react";
import { Provider } from "react-redux";
import appStore from "./utils/redux/appStore";
import CartContext from "./utils/CartContext";
import { auth } from "./utils/firebase";
const App = () => {
  const onlineStatus = useOnlineStatus();
  if (!onlineStatus) {
    return <h1>offline ho beyyy..internet check karo apna</h1>;
  }
  const [userName, setUserName] = useState("");
  const [loggedIn, setLoggedIn] = useState("");
  const [currentRestraunt, setCurrentRestraunt] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        setUserName(user.displayName);
      } else {
        setLoggedIn(false);
        setUserName("");
      }
    });
  }, []);
  // console.log(loggedIn, userName);
  return (
    <>
      <Provider store={appStore}>
        <UserContext.Provider
          value={{
            loggedInUser: userName,
            setUserName,
            currentRestraunt: currentRestraunt,
            setCurrentRestraunt,
            loggedInStatus: loggedIn,
            setLoggedIn,
          }}
        >
          <CartContext.Provider value={{ total: total, setTotal }}>
            <Outlet />
          </CartContext.Provider>
        </UserContext.Provider>
      </Provider>
    </>
  );
};

export default App;
