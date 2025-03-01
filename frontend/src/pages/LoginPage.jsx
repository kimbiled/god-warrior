import React, {useState} from "react";
import login from '../img/login.png'
import password from '../img/password.png'
import eye from '../img/eye.png'
import mail from '../img/mail.png'
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
const [showPassword, setShowPassword] = useState(false);
const navigate = useNavigate()
const handleClick = () => {
    navigate('/dashboard')
}

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 p-6 bg-[#03000F] rounded-lg text-white flex flex-col gap-[88px]">
        <h1 className="text-[20px] font-black text-center mb-6 text-white">Ai Ur Crypto.Com</h1>
        <div className="flex justify-center mb-4">
          <img
            src={login}
            alt="AI Crypto"
          />
        </div>
        <div>
        <div className="relative mb-4 flex flex-row items-center bg-[#222] rounded-full border border-gray-500 px-4 py-3">
          <img src={mail} alt="Email icon" className="w-6 h-6 mr-3" />
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full bg-transparent text-white focus:outline-none placeholder-gray-300"
          />
        </div>
        <div className="relative mb-4 flex flex-row items-center bg-[#222] rounded-full border border-gray-500 px-4 py-3 justify-between">
          <div className="flex flex-row">
          <img src={password} alt="Email icon" className="w-6 h-6 mr-3" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            className="w-full bg-transparent text-white focus:outline-none placeholder-gray-300"
          />
          </div>
          <div>
            <img src={eye} alt="Email icon"  className="w-6 h-6 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)} />
          </div>
        </div>
        <div className="flex justify-between items-center mb-4 text-gray-300">
          <label className="flex items-center text-xs">
            <input type="checkbox" className="appearance-none w-5 h-5 border border-gray-500 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none cursor-pointer mr-2" /> Remember me
          </label>
          <a href="#" className="text-gray-300 text-xs">
            Forgot password?
          </a>
        </div>
        <button className="w-full py-3 bg-gradient-to-r from-[#8628B6] to-[#3A79F9] rounded-[100px] text-white font-semibold hover:opacity-90 transition"
        onClick={handleClick}>
          Login
        </button>
        <p className="text-center text-sm text-gray-300 mt-4">
          Don’t have an account?{' '}
          <a href="#" className="text-blue-400 hover:underline">Sign Up</a>
        </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
