import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    location: { latitude: "", longitude: "" },
    city: "",
  },
  reducers: {
    updateLocation: (state, action) => {
      // console.log(action.payload);
      state.location.latitude = String(action.payload.latitude);
      state.location.longitude = String(action.payload.longitude);
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
  },
});

export default locationSlice.reducer;
export const { updateLocation, setCity } = locationSlice.actions;
