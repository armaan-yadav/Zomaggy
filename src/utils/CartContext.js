import { createContext } from "react";

const CartContext = createContext({
  total: 0,
});

export default CartContext;
