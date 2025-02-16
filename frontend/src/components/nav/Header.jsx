import React, { useEffect, useState } from "react";
import { HiShoppingCart, HiUserCircle } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";
import { useAppStore } from "../../../store/appStore";
import API from "../../../utils/axios";

const Header = () => {
  const { user, totalCart } = useAppStore();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const getCartNumber = async () => {
    try {
      const { data } = await API("/api/user/get-user-cart-number");
      useAppStore.setState({ totalCart: data });
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (user) {
      getCartNumber();
    }
  }, [user]);

  return (
    <header className="bg-white/90 z-50 border-b border-gray-200 sticky top-0 text-gray-800 backdrop-blur-lg shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h2
              onClick={() => navigate("/")}
              className="font-extrabold text-3xl cursor-pointer tracking-tight text-blue-600 hover:text-blue-700 transition-colors"
            >
              QKart
            </h2>
          </div>
          
          <div className="hidden sm:block flex-1 px-8">
            <div className="flex items-center justify-center space-x-8">
              <NavLink
                to="/"
                className={({ isActive }) => 
                  `text-lg font-medium hover:text-blue-600 transition-colors ${
                    isActive ? "text-blue-600" : "text-gray-700"
                  }`
                }
              >
                Home
              </NavLink>
              {!user && (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `text-lg font-medium hover:text-blue-600 transition-colors ${
                      isActive ? "text-blue-600" : "text-gray-700"
                    }`
                  }
                >
                  Login
                </NavLink>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `relative hover:text-blue-600 transition-colors ${
                  isActive ? "text-blue-600" : "text-gray-700"
                }`
              }
            >
              <HiShoppingCart className="w-7 h-7" />
              {user && totalCart > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalCart}
                </span>
              )}
            </NavLink>

            {user ? (
              <div className="relative">
                <HiUserCircle
                  className="w-8 h-8 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
                  onClick={() => setShowMenu((prev) => !prev)}
                />
                {showMenu && <UserMenu setShowMenu={setShowMenu} />}
              </div>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `hover:text-blue-600 transition-colors ${
                    isActive ? "text-blue-600" : "text-gray-700"
                  }`
                }
              >
                <HiUserCircle className="w-8 h-8" />
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
