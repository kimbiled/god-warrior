import React, { useState } from "react";
import login from "../img/login.png";
import phone from "../img/phone.png";
import mail from "../img/mail.png";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpEnabled, setIsOtpEnabled] = useState(false);
  const [message, setMessage] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const showMessage = (msg, isError = false) => {
    setMessage({ text: msg, isError });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSendOtp = async () => {
    let formattedPhone = phoneNumber.replace(/^\+7|^8/, "7");

    try {
      const response = await fetch("http://127.0.0.1:8000/send-otp/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: formattedPhone }),
      });

      if (!response.ok) throw new Error("Unable to send OTP");

      setIsOtpEnabled(true);
      showMessage("OTP sent!");
    } catch {
      showMessage("Incorrect phone number", true);
    }
  };
    const handleLogin = async () => {
      try {
        // Отправляем запрос на сервер для входа
        const response = await fetch("http://127.0.0.1:8000/login/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone_number: phoneNumber, otp }),
        });
    
        // Проверяем, успешен ли ответ
        if (!response.ok) {
          throw new Error("Incorrect code");
        }
    
        // Получаем данные из ответа
        const data = await response.json();
        console.log("Полученный токен:", data.access_token); // Проверяем токен в консоли
    
        // Проверяем, что токен присутствует в ответе
        if (!data.access_token) {
          throw new Error("Токен отсутствует в ответе");
        }
    
        const decodedToken = jwtDecode(data.access_token);
  const userId = decodedToken.user_id; // Предположим, что user_id есть в токене
    
  if (rememberMe) {
    localStorage.setItem("token", data.access_token); // Сохраняем токен в localStorage
    localStorage.setItem("user_id", userId); // Сохраняем user_id в localStorage
  } else {
    sessionStorage.setItem("token", data.access_token); // Сохраняем токен в sessionStorage
    sessionStorage.setItem("user_id", userId); // Сохраняем user_id в sessionStorage
  }
    
        // Показываем сообщение об успешном входе
        showMessage("Successfully entered");
    
        // Перенаправляем на страницу dashboard через 1.5 секунды
        setTimeout(() => navigate("/dashboard"), 1500);
      } catch (error) {
        console.error("Ошибка при входе:", error); // Логируем ошибку для отладки
        showMessage("Incorrect code", true); // Показываем сообщение об ошибке
      }
    };
  
  

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 p-6 bg-[#03000F] rounded-lg text-white flex flex-col gap-6">
        {message && (
          <div className={`text-center py-2 px-4 rounded-lg mb-4 ${message.isError ? "bg-red-500" : "bg-green-500"}`}>
            {message.text}
          </div>
        )}

        <h1 className="text-[20px] font-black text-center text-white">
          Ai Ur Crypto.Com
        </h1>
        <div className="flex justify-center">
          <img src={login} alt="AI Crypto" />
        </div>

        <div>
          <div className="relative mb-4 flex flex-row items-center bg-[#222] rounded-full border border-gray-500 px-4 py-3">
            <img src={phone} alt="Phone icon" className="w-6 h-6 mr-3" />
            <input
              type="tel"
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

          <div className="flex justify-between items-center mb-4 mt-2 text-sm text-gray-300">
            <label className="flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="w-4 h-4 mr-2 rounded-md appearance-none border border-gray-500 bg-transparent checked:bg-blue-500 checked:border-transparent"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember me
            </label>
            <a href="#" className="hover:underline">Forgot password?</a>
          </div>

          <button
            className="w-full py-3 bg-gradient-to-r from-[#8628B6] to-[#3A79F9] rounded-[100px] text-white font-semibold hover:opacity-90 transition"
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
    </div>
  );
};

export default LoginPage;
