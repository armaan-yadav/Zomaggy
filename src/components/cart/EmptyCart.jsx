import CART_IMG from "../../assets/2xempty_cart_yfxml0.avif";
import { Link } from "react-router-dom";
const EmptyCart = () => {
  return (
    <div className="pt-[66px] bg-white flex items-center justify-center h-[100vh] flex-col gap-3 ">
      <div className="flex flex-col items-center jusitfy-center gap-2">
        {" "}
        <img src={CART_IMG} alt="" className="h-[300px] w-[300px]" />
        <span className="text-xl font-[600] ">Your cart is empty</span>
        <span className="text-sm text-gray-400">
          You can go to home page to view more restraunts
        </span>
      </div>
      <div className="bg-[#FC8019] text-white text-lg font-[700] px-10 py-2">
        <Link to={"/"}>
          <span>See all restraunts near you</span>
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
