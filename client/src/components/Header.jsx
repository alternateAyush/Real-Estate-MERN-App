import React from "react";
import {
  FaSearch,
  FaHome,
  FaInfoCircle,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
function Header() {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between max-w-6xl items-center mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap cursor-pointer">
            <span className="text-slate-500">Real</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>

        <form className="bg-slate-100 p-2 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="w-28 sm:w-64 bg-transparent outline-none border-b border-transparent focus:border-slate-500"
          />
          <FaSearch className="text-slate-500" />
        </form>
        <ul className="flex items-center gap-4">
          <li>
            <Link to="/">
              <div className="items-center text-slate-500 gap-1 hidden sm:flex cursor-pointer hover:underline">
                <FaHome className="text-slate-600" />
                <span>Home</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/about">
              <div className="items-center text-slate-500 gap-1 hidden sm:flex cursor-pointer hover:underline">
                <FaInfoCircle className="text-slate-600" />
                <span>About</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/sign-in">
              <div className="flex items-center text-slate-500 gap-1 cursor-pointer hover:underline">
                <FaSignInAlt className="text-slate-600" />
                <span className="hidden sm:inline">Login</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
