import React, { useState } from "react";
import login from '../img/login.png';
import password from '../img/password.png';
import eye from '../img/eye.png';
import mail from '../img/mail.png';
import { useNavigate } from "react-router-dom";

const LoginPageDesktop = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex h-screen bg-[#03000F] text-white">
      {/* Левая часть с формой */}
      <div className="w-1/2 flex flex-col justify-center items-center">
        <h1 className="text-[45px] font-black text-center mb-36">Ai Ur Crypto.Com</h1>
        <div className="w-[400px]">
          <div className="relative mb-4 flex items-center bg-[#222] rounded-full border border-gray-500 px-4 py-3">
            <img src={mail} alt="Email" className="w-6 h-6 mr-3" />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent text-white placeholder-gray-300 focus:outline-none"
            />
          </div>
          <div className="relative mb-4 flex items-center bg-[#222] rounded-full border border-gray-500 px-4 py-3">
            <img src={password} alt="Password" className="w-6 h-6 mr-3" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="w-full bg-transparent text-white placeholder-gray-300 focus:outline-none"
            />
            <img
              src={eye}
              alt="Show Password"
              className="w-6 h-6 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <div className="flex justify-between items-center mb-10 mt-4">
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="w-4 h-4 mr-2 rounded-md accent-blue-500" /> Remember me
            </label>
            <a href="#" className="hover:underline">Forgot password?</a>
          </div>
          <button
            className="w-full py-3 bg-gradient-to-l from-[#8628B6] to-[#3A79F9] rounded-full hover:opacity-90"
            onClick={handleClick}
          >
            Login
          </button>
          <p className="text-center mt-4 text-sm">
            Don’t have an account? <a href="/register" className="text-blue-400 hover:underline">Sign Up</a>
          </p>
        </div>
      </div>

      {/* Правая часть с изображением */}
      <div className="w-1/2 flex justify-center items-center">
        <img src={login} alt="AI Crypto" className="w-[772px] h-[530px]" />
      </div>
    </div>
  );
};

export default LoginPageDesktop;
