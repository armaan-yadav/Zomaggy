import { createSlice } from "@reduxjs/toolkit";

const getCartItems = () => {
  const localCartItems = localStorage.getItem("cart");
  if (localCartItems) {
    return JSON.parse(localCartItems);
  } else {
    return {
      id: "",
      listOfItems: [],
      total: 0,
    };
  }
};
const cartSlice = createSlice({
  name: "cart",
  initialState: getCartItems(),
  reducers: {
    addItem: (state, action) => {
      if (state.listOfItems.length == 0) {
        //checking if the listOfItems is empty : if yes means no items has been placed thus enter the restraunt Id
        state.id = action.payload.id;
        state.listOfItems.push({
          info: action.payload.info,
          count: 1,
        });
      } else {
        //at least one item is there : two cases => ONE from same restraunt , TWO from different restraunt
        if (state.id === action.payload.id) {
          //Case ONE : item  from same restraunt
          //      simple add new item in listOfItems
          //            => (item already exists) ? increase count : add in listOfItems
          const existingItem = state.listOfItems.find(
            (e) => e.info.id === action.payload.info.id
          );
          if (existingItem) {
            existingItem.count += 1;
          } else {
            state.listOfItems.push({
              info: action.payload.info,
              count: 1,
            });
          }
        } else {
          // Case TWO  : item from different restraunt
          //        clear cart
          //            update id and then add item in listOfItems

          state.id = action.payload.id;
          state.listOfItems.length = 0;
          state.total = 0;
          state.listOfItems.push({
            info: action.payload.info,
            count: 1,
          });
        }
      }

      state.total += action.payload.info.price
        ? action.payload.info.price
        : action.payload.info.defaultPrice;

      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeItem: (state, action) => {
      const existingItem = state.listOfItems.find(
        (item) => item.info.id === action.payload.id
      );

      if (existingItem && existingItem.count > 1) {
        existingItem.count -= 1;
      } else {
        state.listOfItems = state.listOfItems.filter(
          (item) => item.info.id != action.payload.id
        );
      }
      state.total -= action.payload.price
        ? action.payload.price
        : action.payload.defaultPrice;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart: (state) => {
      state.items.length = 0;
      state.total = 0;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export default cartSlice.reducer;
export const { addItem, removeItem, clearCart } = cartSlice.actions;
