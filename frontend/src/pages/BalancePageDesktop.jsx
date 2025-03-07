import Navbar from "../components/Navbar";
import Aside from '../components/Aside'
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import bg from "../img/bg.png";
import graph from '../img/marketDesktop.png' 
import FooterMarket from "../components/FooterMarket";

const BalancePageDesktop = () => {
    const percentage = 43
    const percentages = 68

    return(
        <div className="flex flex-col bg-[#07051B]">
            <div>
                <Navbar />
            </div>
            <div className="flex flex-row items-center justify-center">
                <Aside />
                <div className="w-full p-12 flex flex-row">
                <div className="w-[768px] flex flex-col items-start justify-center gap-16 text-white h-[780px]">
                   <div
                          className="w-full max-h-[465px] h-full rounded-[30px] flex  flex-col p-4 gap-6"
                          style={{
                              backgroundImage: `url(${bg})`,
                              backgroundSize: "100% 100%", // Растягивает картинку в блок
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center",
                          }}
                          >
                              <p className="font-semibold text-left text-[30px]">Analytical Overview</p>
                              <img src={graph} alt="graph" />
                      </div>
                      <div className="w-[680px] h-full">
                      <FooterMarket />
                      </div>
                </div>
                <div className="flex flex-col w-2/3 text-white items-center gap-7">
                

        <div className="w-[620px] max-h-[380px]  h-full rounded-[18px] border-[1px] border-[#17112F] bg-transparent p-4 flex flex-col gap-4">
           <div className="flex flex-col justify-center">
            <div>
                <p className="font-semibold text-left text-[32px]">XRP Balances</p>
            </div>
            <div>
                <p className="font-semibold text-left text-[28px]">$2,910.93</p>
            </div>
           </div>

             <div className="relative w-60 h-60 flex items-center justify-center mx-auto">
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
        <div className="w-[620px] max-h-[380px] h-full rounded-[18px] border-[1px] border-[#17112F] bg-transparent p-4 flex flex-col gap-4">
           <div className="flex flex-col justify-center">
            <div>
                <p className="font-semibold text-left text-[32px]">Bot Made You in 24 hours</p>
            </div>
            <div>
                <p className="font-semibold text-left text-[28px]">9XRP = $21.93</p>
            </div>
           </div>

             <div className="relative w-60 h-60 flex items-center justify-center mx-auto">
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
                </div>
            </div>
        </div>
    </div>
    )
}

export default BalancePageDesktop;