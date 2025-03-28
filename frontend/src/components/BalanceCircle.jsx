import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const BalanceCircle = () => {
  const [balance, setBalance] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  useEffect(() => {
    const fetchBalance = async () => {
      if (!token) return;
  
      try {
        const response = await fetch("http://127.0.0.1:8000/user-deposit/", {
          method: "GET",
          headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
  
        if (!response.ok) throw new Error("Ошибка при получении данных");
  
        const data = await response.json();
        console.log("Полученные данные:", data);
  
        // Ищем объект, где currency === "XRP"
        const xrpDeposit = data.deposits.find(deposit => deposit.currency === "USD");
        const balanceValue = xrpDeposit ? xrpDeposit.amount : 0;
  
        setBalance(balanceValue);
  
        const maxBalance = 200000; // Можно изменить
        setPercentage(Math.min((balanceValue / maxBalance) * 100, 100)); // Ограничение 100%
        
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    };
  
    fetchBalance();
  }, [token]);
  

  return (
    <div className="relative w-48 h-48 lg:w-80 lg:h-80 flex items-center justify-center">
      {/* Внешний пунктирный круг */}
      <div className="absolute w-full h-full rounded-full border-[3px] border-dashed border-blue-500 opacity-50"></div>

      {/* Средний круг */}
      <div className="absolute w-[90%] h-[90%] rounded-full border-[6px] border-solid border-[#1A1A3D]"></div>
      
      {/* Внутренний прогресс-бар */}
      <div className="absolute w-[80%] h-[80%]">
        <CircularProgressbar
          value={percentage}
          strokeWidth={10}
          styles={buildStyles({
            strokeLinecap: "round",
            pathColor: "url(#gradient)",
            trailColor: "#12122A",
            rotation: 0.75,
          })}
        />
      </div>
      
      {/* Градиент для прогресса */}
      <svg style={{ height: 0 }}>
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#A020F0" />
            <stop offset="100%" stopColor="#00A2FF" />
          </linearGradient>
        </defs>
      </svg>

      {/* Баланс в центре */}
      <div className="absolute text-center">
        <p className="text-gray-300 sm20:text-sm lg:text-[22px]">Balance</p>
        <p className="sm20:text-xl lg:text-[30px] font-bold bg-gradient-to-r from-[#3355F3] to-[#C333F3] bg-clip-text text-transparent">${balance.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default BalanceCircle;
