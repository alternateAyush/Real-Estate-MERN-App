import React from "react";
import { Link } from "react-router-dom";

const inputCss =
  "border border-transparent border-b-slate-500 p-2 bg-transparent outline-none shadow-md focus:shadow-sm";

const buttonCss =
  "p-2 rounded-lg cursor-pointer text-white uppercase shadow-md active:shadow-sm hover:opacity-95 disabled:opacity-70 disabled:pointer-events-none disabled:shadow-sm";

function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center text-xl sm:text-3xl font-semibold my-7">
        Sign Up
      </h1>
      <form className="flex flex-col gap-4">
        <input
          className={inputCss}
          placeholder="Username"
          type="text"
          id="username"
        ></input>
        <input
          className={inputCss}
          placeholder="Email"
          type="email"
          id="email"
        ></input>
        <input
          className={inputCss}
          placeholder="Password"
          type="password"
          id="password"
        ></input>
        <button className={`bg-slate-700 ${buttonCss}`}>sign up</button>
        <button disabled className={`bg-red-700 ${buttonCss}`}>
          continue with google
        </button>
      </form>
      <div className="flex gap-1 mt-3">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-700">Click Here.</span>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
