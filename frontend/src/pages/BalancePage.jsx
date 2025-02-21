import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import Footer from "../components/Footer";
import "react-circular-progressbar/dist/styles.css";
import bell from "../img/bell.png";
import arrowLeft from '../img/arrow-left.png'
import bg from "../img/bg2.png";
import graph from '../img/graph.svg'
import btcWhite from '../img/btcWhite.svg'
import {useNavigate } from "react-router-dom";


import BalanceCircle from "../components/BalanceCircle";
const BalancePage = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/dashboard')
    }
    const percentage = 43
    const percentages = 68
  return (
    <div className="flex flex-col bg-transparent h-auto text-white p-4 max-w-md mx-auto gap-4 pb-[120px]">
      <div className="w-full flex justify-between items-center mb-6 relative mt-16 px-4">
      {/* Кнопка "Назад" слева */}
      <div className="p-2 cursor-pointer">
        <img src={arrowLeft} alt="back" className="w-6 h-6" onClick={handleClick}/>
      </div>

      {/* Заголовок по центру */}
      <h1 className="text-[20px] font-black text-center flex-1">Ai Ur Crypto.Com</h1>

      {/* Кнопка "Уведомления" справа */}
      <div className="p-2 bg-gradient-to-r from-[#262833] to-[#091025] rounded-full cursor-pointer">
        <img src={bell} alt="bell" className="w-[20px] h-[20px]" />
      </div>
    </div>

    <div
        className="w-full max-h-[293px] h-full rounded-[18px] flex  flex-col p-4 gap-6"
        style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: "100% 100%", // Растягивает картинку в блок
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
        }}
        >
            <p className="font-semibold text-left text-xl">Analytical Overview</p>
            <img src={graph} alt="graph" />
    </div>

        <div className="w-full max-h-[293px] h-full rounded-[18px] border-[1px] border-[#17112F] bg-transparent p-4 flex flex-col gap-4">
           <div className="flex flex-row justify-between items-center">
            <div>
                <p className="font-semibold text-left text-lg">Bot Made You in<br/> 24 hours</p>
            </div>
            <div>
                <p className="font-semibold text-left text-lg">9XRP = $21.93</p>
            </div>
           </div>

             <div className="relative w-48 h-48 flex items-center justify-center mx-auto">
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
                   <p className="text-gray-300 text-sm">(9 XRP)</p>
                   <p className="text-xl font-bold text-purple-400">$21.93</p>
                 </div>
               </div>
        </div>

        <div className="w-full max-h-[293px] h-full rounded-[18px] border-[1px] border-[#17112F] bg-transparent p-4 flex flex-col gap-4">
           <div className="flex flex-row justify-between items-center">
            <div>
                <p className="font-semibold text-left text-lg">XRP Balances</p>
            </div>
            <div>
                <p className="font-semibold text-left text-lg">$2,910.93</p>
            </div>
           </div>

             <div className="relative w-48 h-48 flex items-center justify-center mx-auto">
                 {/* Внешний пунктирный круг */}
                 <div className="absolute w-full h-full rounded-full border-[3px] border-dashed border-blue-500 opacity-50"></div>
           
                 {/* Средний круг */}
                 <div className="absolute w-[90%] h-[90%] rounded-full border-[6px] border-solid border-[#1A1A3D]"></div>
                 
                 {/* Внутренний прогресс-бар */}
                 <div className="absolute w-[80%] h-[80%]">
                   <CircularProgressbar
                     value={percentages}
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
                   <p className="text-gray-300 text-sm">Your Balance</p>
                   <p className="text-xl font-bold text-purple-400">$2910.93</p>
                 </div>
               </div>
        </div>
        
        <div className="flex flex-col gap-4">
        <button className="w-full h-9 rounded-2xl mx-auto flex items-center justify-center bg-gradient-to-r from-[#4D60FF] to-[#A04DFF] text-white py-3 text-xs font-semibold gap-2">
         Stop Trade
        </button>
        <button className="w-full h-9 rounded-2xl mx-auto flex items-center justify-center bg-[#259C3B] text-white py-3 font-semibold gap-2">
         <img src={btcWhite} alt="btcWhite" /> $100,007.77
        </button>
        </div>
        <Footer />
      </div>
      
  );
};

export default BalancePage;
