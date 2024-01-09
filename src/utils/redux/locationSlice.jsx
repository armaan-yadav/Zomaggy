import { createSlice } from "@reduxjs/toolkit";
const getLocation = () => {
  const localLocation = localStorage.getItem("location");

  if (localLocation) {
    return JSON.parse(localLocation);
  } else {
    return {
      location: { latitude: "", longitude: "" },
      address: "",
    };
  }
};

const locationSlice = createSlice({
  name: "location",
  initialState: getLocation(),
  reducers: {
    updateLocation: (state, action) => {
      state.location.latitude = String(action.payload.latitude);
      state.location.longitude = String(action.payload.longitude);
      localStorage.setItem("location", JSON.stringify(state));
    },
    setAddress: (state, action) => {
      state.address = action.payload;
      localStorage.setItem("location", JSON.stringify(state));
    },
  },
});

export default locationSlice.reducer;
export const { updateLocation, setAddress } = locationSlice.actions;
