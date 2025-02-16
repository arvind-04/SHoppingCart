import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/appStore";

const ProductCard = ({ item }) => {
  const { addCart } = useAppStore();
  const navigate = useNavigate();
  const productName = (name) => {
    if (name.length > 20) {
      return name.substring(0, 20) + "...";
    }
    return name;
  };

  return (
    <div className="group flex items-center bg-white relative flex-col justify-between p-4 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-[150px] sm:h-[200px] w-full overflow-hidden rounded-lg">
        <img
          src={item.image}
          onClick={() => navigate(`/product/${item.id}`)}
          className="w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-110"
          alt={item.title}
        />
        <div className="absolute top-2 left-2 rounded-full w-10 h-10 flex items-center justify-center text-sm font-medium text-white bg-pink-500 shadow-lg transform group-hover:scale-110 transition-transform">
          {item.rating.count}
        </div>
      </div>

      <div className="py-4 flex flex-col gap-2 w-full">
        <h2
          className="cursor-pointer font-medium text-gray-800 hover:text-blue-600 transition-colors"
          onClick={() => navigate(`/product/${item.id}`)}
        >
          {productName(item.title)}
        </h2>
        <h2 className="text-center font-bold text-lg">
          <span className="text-gray-500">₹</span>
          <span className="text-blue-600">{Math.ceil(item.price * 81)}</span>
        </h2>
      </div>

      <button
        onClick={() => addCart(item, navigate)}
        className="w-full bg-blue-600 text-white py-2 px-6 rounded-lg font-medium
          transform transition-all duration-300
          hover:bg-blue-700 hover:shadow-lg
          active:scale-95 active:bg-blue-800
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ProductCard;
