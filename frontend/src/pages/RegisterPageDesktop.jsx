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
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
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
        body: JSON.stringify({
          phone_number: phoneNumber.replace(/^\+7|^8/, ""),
          name,
          username,
          location,
        }),
      });

      console.log(response)

      if (!response.ok) throw new Error("Unable to send OTP");
      setIsOtpEnabled(true);
      showMessage("OTP sent!");
    } catch {
      showMessage("Incorrect phone number or other error", true);
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/verify-otp/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: phoneNumber, otp }),
      });

      if (!response.ok) throw new Error("Incorrect code");
      showMessage("Successfully registered!");
      setTimeout(() => navigate("/"), 2000);
    } catch {
      showMessage("Incorrect code", true);
    }
  };

  return (
    <div className="flex h-screen bg-[#03000F] text-white">
      <div className="w-1/2 flex flex-col justify-center items-center">
        <h1 className="text-[45px] font-black text-center mb-36">Ai Ur Crypto.Com</h1>
        {message && (
          <div className={`text-center py-2 px-4 rounded-lg mb-4 ${message.isError ? "bg-red-500" : "bg-green-500"}`}>
            {message.text}
          </div>
        )}
        <div className="w-[400px] mb-8">
          <div className="relative mb-4 flex items-center bg-[#222] rounded-full border border-gray-500 px-4 py-3">
            <img src={phone} alt="phone" className="w-6 h-6 mr-3" />
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full bg-transparent text-white placeholder-gray-300 focus:outline-none"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="relative mb-4 flex items-center bg-[#222] rounded-full border border-gray-500 px-4 py-3">
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full bg-transparent text-white placeholder-gray-300 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="relative mb-4 flex items-center bg-[#222] rounded-full border border-gray-500 px-4 py-3">
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full bg-transparent text-white placeholder-gray-300 focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="relative mb-4 flex items-center bg-[#222] rounded-full border border-gray-500 px-4 py-3">
            <input
              type="text"
              placeholder="Enter your location"
              className="w-full bg-transparent text-white placeholder-gray-300 focus:outline-none"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
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