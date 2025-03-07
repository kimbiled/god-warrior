import React, { useState } from "react";
import login from '../img/login.png';
import phone from '../img/phone.png';
import mail from '../img/mail.png';
import { useNavigate } from "react-router-dom";

const RegisterPageDesktop = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpEnabled, setIsOtpEnabled] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const showMessage = (msg, isError = false) => {
    setMessage({ text: msg, isError });
    setTimeout(() => setMessage(null), 3000);
  };

  const sendOtp = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: phoneNumber.replace(/^\+7|^8/, "") }),
      });

      if (!response.ok) throw new Error("Ошибка отправки OTP");
      setIsOtpEnabled(true);
      showMessage("OTP отправлен!");
    } catch {
      showMessage("Ошибка сети", true);
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/verify-otp/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: phoneNumber, otp }),
      });

      if (!response.ok) throw new Error("Неверный код");
      showMessage("Успешная регистрация!");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch {
      showMessage("Ошибка проверки OTP", true);
    }
  };

  return (
    <div className="flex h-screen bg-[#03000F] text-white">
      <div className="w-1/2 flex flex-col justify-center items-center">
        <h1 className="text-[45px] font-black text-center mb-36">Ai Ur Crypto.Com</h1>
        {message && (
          <div className={`text-center py-2 px-4 rounded-lg ${message.isError ? "bg-red-500" : "bg-green-500"}`}>
            {message.text}
          </div>
        )}
        <div className="w-[400px] mb-8">
          <div className="relative mb-4 flex items-center bg-[#222] rounded-full border border-gray-500 px-4 py-3">
            <img src={phone} alt="phone" className="w-6 h-6 mr-3" />
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
              <img src={mail} alt="code" className="w-6 h-6 mr-3" />
              <input
                placeholder="Enter the code"
                className="w-full bg-transparent text-white placeholder-gray-300 focus:outline-none"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          )}
        </div>
       <div className="w-[400px]">
       <button
            className="w-full py-3 bg-gradient-to-l from-[#8628B6] to-[#3A79F9] rounded-full hover:opacity-90"
            onClick={isOtpEnabled ? verifyOtp : sendOtp}
          >
            {isOtpEnabled ? "Verify OTP" : "Register"}
          </button>
          <p className="text-center mt-4 text-sm text-gray-300">
            Already have an account? <a href="/" className="text-blue-400 hover:underline">Sign In</a>
          </p>
       </div>
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <img src={login} alt="AI Crypto" className="w-[772px] h-[530px]" />
      </div>
    </div>
  );
};

export default RegisterPageDesktop;
