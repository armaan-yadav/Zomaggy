import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import locationSlice from "./locationSlice";
import userSlice from "./userSlice";
const appStore = configureStore({
  reducer: {
    cart: cartSlice,
    location: locationSlice,
    user: userSlice,
  },
});

export default appStore;
