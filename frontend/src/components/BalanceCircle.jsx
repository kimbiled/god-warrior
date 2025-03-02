import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const BalanceCircle = () => {
  const percentage = 75; // Основной прогресс

  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
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
            pathColor: "url(#gradient)", // Градиентный цвет
            trailColor: "#12122A",
            rotation: 0.75, // Смещение начала
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
        <p className="text-gray-300 text-sm">Balance</p>
        <p className="text-xl font-bold text-purple-400">$7,770.00</p>
      </div>
    </div>
  );
};

export default BalanceCircle;
