import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSpinner, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { notify } from "../utils/Notify";
import "react-toastify/dist/ReactToastify.css";
import {useDispatch,useSelector} from 'react-redux';
import { signInStart,signInSuccess,signInFailure } from "../redux/user/userSlice.js";

const inputCss =
  "border border-transparent border-b-slate-500 p-2 bg-transparent outline-none shadow-md focus:shadow-sm";

const buttonCss =
  "p-2 flex justify-center rounded-lg cursor-pointer text-white uppercase shadow-md active:shadow-sm hover:opacity-95 disabled:opacity-70 disabled:pointer-events-none disabled:shadow-sm";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state)=>state.user);
  const [hidden, setHidden] = useState(true);
  useEffect(() => {});
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data);
        notify(data.message, "error");
        dispatch(signInFailure(data.message));
        return;
      } else {
        notify(`Welcome ${data.username}!`, "success");
        dispatch(signInSuccess(data));
        navigate("/");
        return;
      }
    } catch (err) {
      console.log("error1: ", err);
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center text-xl sm:text-3xl font-semibold my-7'>
        Sign In
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          className={inputCss}
          placeholder='Username/Email'
          type='text'
          id='cred'
          onChange={handleChange}
          required
        />
        <div className='flex flex-row items-center relative'>
          <input
            className={`${inputCss} w-full`}
            placeholder='Password'
            type={hidden? 'password':'text'}
            id='password'
            onChange={handleChange}
            required
          />
          <button className='absolute right-1 cursor-pointer' type='button' onClick={()=>{setHidden(!hidden)}}>
            {hidden? <FaRegEye />:<FaRegEyeSlash/>}
          </button>
        </div>
        <button className={`bg-slate-700 ${buttonCss}`} disabled={loading}>
          {loading ? <FaSpinner size={20} /> : <span>sign in</span>}
        </button>
        <button disabled className={`bg-red-700 ${buttonCss}`}>
          continue with google
        </button>
      </form>
      <div className='flex gap-1 mt-3'>
        <p>Don&apos;t have an account?</p>
        <Link to='/sign-up'>
          <span className='text-blue-700 hover:underline'>Sign up</span>
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
