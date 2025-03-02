import React, {useState} from "react";
import login from '../img/login.png'
import phone from '../img/phone.png'
import mail from '../img/mail.png'
import { useNavigate } from "react-router-dom";


const RegisterPage = () => {
const [showPassword, setShowPassword] = useState(false);
const navigate = useNavigate()
const handleClick = () => {
    navigate('/')
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
          <img src={phone} alt="Phone icon" className="w-6 h-6 mr-3" />
          <input
            type="number"
            placeholder="Enter your phone number"
            className="w-full bg-transparent text-white focus:outline-none placeholder-gray-300"
          />
        </div>
        <div className="relative mb-4 flex flex-row items-center bg-[#222] rounded-full border border-gray-500 px-4 py-3">
          <img src={mail} alt="Email icon" className="w-6 h-6 mr-3" />
          <input
            type="number"
            placeholder="Enter the code"
            className="w-full bg-transparent text-white focus:outline-none placeholder-gray-300"
          />
        </div>
        <button className="w-full py-3 bg-gradient-to-r from-[#8628B6] to-[#3A79F9] rounded-[100px] text-white font-semibold hover:opacity-90 transition"
        onClick={handleClick}>
          Register
        </button>
        <p className="text-center text-sm text-gray-300 mt-4">
          Alreary have an account?{' '}
          <a href="/" className="text-blue-400 hover:underline">Sign In</a>
        </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
