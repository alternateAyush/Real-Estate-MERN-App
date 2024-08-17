import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { notify } from "../utils/Notify";
import "react-toastify/dist/ReactToastify.css";

const inputCss =
  "border border-transparent border-b-slate-500 p-2 bg-transparent outline-none shadow-md focus:shadow-sm";

const buttonCss =
  "p-2 flex justify-center rounded-lg cursor-pointer text-white uppercase shadow-md active:shadow-sm hover:opacity-95 disabled:opacity-70 disabled:pointer-events-none disabled:shadow-sm";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [guideline, setGuideline] = useState(null);
  useEffect(() => {});
  const handleChange = (e) => {
    setGuideline(null);
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    if (e.target.id == "username" || e.target.id== 'password') {
      if (
        (e.target.value[0] >= "A" && e.target.value <= "Z") ||
        (e.target.value[0] >= "a" && e.target.value <= "z")
      ) {
        if(e.target.value.includes(' ')){
          setGuideline("No spaces allowed in username/password.");
        }
      } else {
        setGuideline("Username/Password must start with an alphabet.");
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (guideline) {
      notify(guideline, "error");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        notify(data.message, "error");
      } else {
        notify("User signup successfull.", "success");
        setLoading(false);
        navigate("/sign-in");
      }
    } catch (err) {
      console.log("error1: ", err);
    }
    setLoading(false);
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center text-xl sm:text-3xl font-semibold my-7'>
        Sign Up
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          className={inputCss}
          placeholder='Username'
          type='text'
          id='username'
          onChange={handleChange}
          required
        ></input>
        <input
          className={inputCss}
          placeholder='Email'
          type='email'
          id='email'
          onChange={handleChange}
          required
        ></input>
        <input
          className={inputCss}
          placeholder='Password'
          type='password'
          id='password'
          onChange={handleChange}
          required
        ></input>
        <button className={`bg-slate-700 ${buttonCss}`} disabled={loading}>
          {loading ? <FaSpinner size={20} /> : <span>sign up</span>}
        </button>
        <button disabled className={`bg-red-700 ${buttonCss}`}>
          continue with google
        </button>
      </form>
      <div className='flex gap-1 mt-3'>
        <p>Have an account?</p>
        <Link to='/sign-in'>
          <span className='text-blue-700'>Click Here.</span>
        </Link>
      </div>
      {guideline && <p className='text-red-500'>{guideline}</p>}
    </div>
  );
}

export default SignUp;
