import React, { useState } from "react";
import login from '../img/login.png';
import phone from '../img/phone.png';
import mail from '../img/mail.png';
import { useNavigate } from "react-router-dom";

const RegisterPageDesktop = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex h-screen bg-[#03000F] text-white">
      {/* Левая часть с формой */}
      <div className="w-1/2 flex flex-col justify-center items-center">
        <h1 className="text-[45px] font-black text-center mb-36">Ai Ur Crypto.Com</h1>
        <div className="w-[400px] mb-8">
          <div className="relative mb-4 flex items-center bg-[#222] rounded-full border border-gray-500 px-4 py-3">
            <img src={phone} alt="phone" className="w-6 h-6 mr-3" />
            <input
              type="number"
              placeholder="Enter your phone number"
              className="w-full bg-transparent text-white placeholder-gray-300 focus:outline-none"
            />
          </div>
          <div className="relative mb-4 flex items-center bg-[#222] rounded-full border border-gray-500 px-4 py-3">
            <img src={mail} alt="code" className="w-6 h-6 mr-3" />
            <input
              placeholder="Enter the code"
              className="w-full bg-transparent text-white placeholder-gray-300 focus:outline-none"
            />
          </div>
        </div>
       <div className="w-[400px]">
       <button
            className="w-full py-3 bg-gradient-to-l from-[#8628B6] to-[#3A79F9] rounded-full hover:opacity-90"
            onClick={handleClick}
          >
            Register
          </button>
          <p className="text-center mt-4 text-sm">
            Already have an account? <a href="/register" className="text-blue-400 hover:underline">Sign In</a>
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

export default RegisterPageDesktop;
