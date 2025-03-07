import React, { useState } from "react";
import login from '../img/login.png';
import phone from '../img/phone.png';
import mail from '../img/mail.png';
import { useNavigate } from "react-router-dom";

const LoginPageDesktop = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpEnabled, setIsOtpEnabled] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const showMessage = (msg, isError = false) => {
    setMessage({ text: msg, isError });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSendOtp = async () => {
    let formattedPhone = phoneNumber.replace(/^\+|^8/, "");

    try {
      const response = await fetch("http://127.0.0.1:8000/send-otp/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: formattedPhone }),
      });

      if (!response.ok) throw new Error("Ошибка отправки OTP");

      setIsOtpEnabled(true);
      showMessage("OTP отправлен!");
    } catch {
      showMessage("Ошибка сети", true);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: phoneNumber, otp }),
      });

      if (!response.ok) throw new Error("Неверный код");

      showMessage("Успешный вход!");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch {
      showMessage("Ошибка входа", true);
    }
  };

  return (
    <div className="flex h-screen bg-[#03000F] text-white">
      {/* Левая часть с формой */}
      <div className="w-1/2 flex flex-col justify-center items-center">
        <h1 className="text-[45px] font-black text-center mb-36">Ai Ur Crypto.Com</h1>
        <div className="w-[400px]">
          <div className="relative mb-4 flex items-center bg-[#222] rounded-full border border-gray-500 px-4 py-3">
            <img src={phone} alt="Phone" className="w-6 h-6 mr-3" />
            <input
              type="number"
              placeholder="Enter your phone number"
              className="w-full bg-transparent text-white placeholder-gray-300 focus:outline-none"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          {isOtpEnabled && (
            <div className="relative mb-4 flex items-center bg-[#222] rounded-full border border-gray-500 px-4 py-3">
              <img src={mail} alt="Code" className="w-6 h-6 mr-3" />
              <input
                placeholder="Enter the code"
                className="w-full bg-transparent text-white placeholder-gray-300 focus:outline-none"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          )}

          <div className="flex justify-between items-center mb-4 text-sm">
          <label className="flex items-center cursor-pointer">
  <input 
    type="checkbox" 
    className="w-4 h-4 mr-2  rounded appearance-none border border-gray-500 bg-transparent checked:bg-blue-500 checked:border-transparent"
  /> 
  Remember me
</label>

            <a href="#" className="hover:underline text-gray-300">Forgot password?</a>
          </div>

          <button
            className="w-full py-3 bg-gradient-to-r from-[#3A79F9] to-[#8628B6] rounded-full text-white font-semibold hover:opacity-90 transition text-lg"
            onClick={isOtpEnabled ? handleLogin : handleSendOtp}
          >
            {isOtpEnabled ? "Login" : "Get Code"}
          </button>

          <p className="text-center text-sm text-gray-300 mt-4">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-400 hover:underline">Sign Up</a>
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
