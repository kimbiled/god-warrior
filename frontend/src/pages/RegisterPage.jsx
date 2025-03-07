import React, { useState } from "react";
import login from "../img/login.png";
import phone from "../img/phone.png";
import mail from "../img/mail.png";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
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
      setTimeout(() => navigate("/"), 2000);
    } catch {
      showMessage("Ошибка проверки OTP", true);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 p-6 bg-[#03000F] rounded-lg text-white flex flex-col gap-[88px]">
        {message && (
          <div className={`text-center py-2 px-4 rounded-lg ${message.isError ? "bg-red-500" : "bg-green-500"}`}>
            {message.text}
          </div>
        )}

        <h1 className="text-[20px] font-black text-center mb-6 text-white">Ai Ur Crypto.Com</h1>
        <div className="flex justify-center mb-4">
          <img src={login} alt="AI Crypto" />
        </div>

        <div>
          <div className="relative mb-4 flex flex-row items-center bg-[#222] rounded-full border border-gray-500 px-4 py-3">
            <img src={phone} alt="Phone icon" className="w-6 h-6 mr-3" />
            <input
              type="number"
              placeholder="Enter your phone number"
              className="w-full bg-transparent text-white focus:outline-none placeholder-gray-300"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          {isOtpEnabled && (
            <div className="relative mt-4 mb-4 flex flex-row items-center bg-[#222] rounded-full border border-gray-500 px-4 py-3">
              <img src={mail} alt="Email icon" className="w-6 h-6 mr-3" />
              <input
                type="text"
                placeholder="Enter the code"
                className="w-full bg-transparent text-white focus:outline-none placeholder-gray-300"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          )}

          <button
            className="w-full py-3 bg-gradient-to-r from-[#8628B6] to-[#3A79F9] rounded-[100px] text-white font-semibold hover:opacity-90 transition"
            onClick={isOtpEnabled ? verifyOtp : sendOtp}
          >
            {isOtpEnabled ? "Verify OTP" : "Register"}
          </button>
          <p className="text-center text-sm text-gray-300 mt-4">
            Already have an account?{" "}
            <a href="/" className="text-blue-400 hover:underline">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
