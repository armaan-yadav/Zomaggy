import { useDispatch } from "react-redux";
import { addItem, removeItem } from "./redux/cartSlice";

const AddCountRemoveBtn = ({ info, id, itemCount, extraCSS }) => {
  const dispatcher = useDispatch();
  return (
    <div
      className={`w-full px-2 text-[#60B247] border-[1.5px] text-center border-gray-300 bg-white rounded-lg shadow-sm   hover:shadow-md cursor-pointer flex flex-row justify-between ${extraCSS}`}
    >
      <div
        className="w-[30%]"
        onClick={() => {
          dispatcher(addItem({ info, id }));
        }}
      >
        <i className="fa-solid fa-plus"></i>
      </div>
      <span>{itemCount}</span>
      <div
        className="w-[30%]"
        onClick={() => {
          dispatcher(removeItem(info));
        }}
      >
        <i className="fa-solid fa-minus"></i>
      </div>
    </div>
  );
};

export default AddCountRemoveBtn;
