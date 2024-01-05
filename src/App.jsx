import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import useOnlineStatus from "./utils/useOnlineStatus";
import UserContext from "./utils/UserContext";
import { useState } from "react";
import { Provider } from "react-redux";
import appStore from "./utils/redux/appStore";
import CartContext from "./utils/CartContext";

const App = () => {
  const onlineStatus = useOnlineStatus();
  if (!onlineStatus) {
    return <h1>offline ho beyyy..internet check karo apna</h1>;
  }
  const [userName, setUserName] = useState("Armaan");
  const [currentRestraunt, setCurrentRestraunt] = useState({});
  const [total, setTotal] = useState(0);
  return (
    <>
      <Provider store={appStore}>
        <UserContext.Provider
          value={{
            loggedInUser: userName,
            setUserName,
            currentRestraunt: currentRestraunt,
            setCurrentRestraunt,
          }}
        >
          <CartContext.Provider value={{ total: total, setTotal }}>
            <Header />
            <Outlet />
          </CartContext.Provider>
        </UserContext.Provider>
      </Provider>
    </>
  );
};

export default App;
