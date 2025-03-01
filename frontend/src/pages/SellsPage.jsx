import React, {useState, useRef, useEffect} from "react";
import bell from "../img/bell.png";
import arrowLeft from '../img/arrow-left.png'
import bg from "../img/bg2.png";
import bot from "../img/bot.svg";
import lines from '../img/lines.svg'
import percent from '../img/percent.svg'
import {useNavigate } from "react-router-dom";


import BalanceCircle from "../components/BalanceCircle";
const SalesPage = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/dashboard')
    }

    const [amount, setAmount] = useState(2000);
    const [price, setPrice] = useState(2.0);
    const [percentage, setPercentage] = useState(100);
 
    const amountRef = useRef(null);
    const priceRef = useRef(null);
    const percentageRef = useRef(null);
  

    const updateTooltipPositions = (ref, value, min, max) => {
        if (ref.current) {
          const percent = ((value - min) / (max - min)) * 100;
          ref.current.style.left = `calc(${percent}% - 20px)`;
        }
      };
    // Обновление позиций `tooltip`
    useEffect(() => {
      updateTooltipPositions(amountRef, amount, 0, 5000);
      updateTooltipPositions(priceRef, price, 0.1, 10);
      updateTooltipPositions(percentageRef, percentage, 0, 100);
    }, [amount, price, percentage]);
  
  
    const [sellAmount, setSellAmount] = useState(5.5);  // Было 2.0 → Теперь 5.5
const [sellPrice, setSellPrice] = useState(7.2);    // Было 3.7 → Теперь 7.2
const [sellPercentage, setSellPercentage] = useState(50); // Было 100% → Теперь 50%
  
    const sellAmountRef = useRef(null);
  const sellPriceRef = useRef(null);
  const sellPercentageRef = useRef(null);

  // Функция обновления позиции `tooltip`
  const updateTooltipPosition = (ref, value, min, max) => {
    if (ref.current) {
      const percent = ((value - min) / (max - min)) * 100;
      ref.current.style.left = `calc(${percent}% - 20px)`;
    }
  };

  useEffect(() => {
    updateTooltipPosition(sellAmountRef, sellAmount, 0, 10);
    updateTooltipPosition(sellPriceRef, sellPrice, 0, 10);
    updateTooltipPosition(sellPercentageRef, sellPercentage, 0, 100);
  }, [sellAmount, sellPrice, sellPercentage]);
  return (
    <div className="flex flex-col bg-transparent h-auto text-white p-4 max-w-md mx-auto">
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
      
      <div className="relative flex flex-col items-center mb-10">
        <BalanceCircle />
      </div>

      <div className="p-6 rounded-2xl shadow-md w-full max-w-md mx-auto mb-6"
         style={{
           backgroundImage: `url(${bg})`,
           backgroundSize: "cover",
           backgroundPosition: "center",
         }}>
      <h2 className="text-lg font-bold text-white mb-4">Buying Overview</h2>

      {/* Amount to Trade */}
      <div className="mb-8 relative">
        <p className="text-gray-400 mb-2">Amount to Trade</p>
        <div className="relative w-full">
          <div
            ref={amountRef}
            className="absolute top-[-35px] transform -translate-x-1/2 bg-[#0E0E1A] text-white text-xs font-bold px-3 py-1 rounded-full border border-[#6C5DD3] shadow-md opacity-100 transition-opacity duration-200"
          >
            ${amount.toLocaleString()}
          </div>
          <input
            type="range"
            min="0"
            max="5000"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full appearance-none bg-transparent cursor-pointer range-slider"
            style={{
              background: `linear-gradient(to right, #4D60FF 0%, #A04DFF ${(amount / 5000) * 100}%, #1A1433 ${(amount / 5000) * 100}%)`,
            }}
          />
        </div>
        <img src={lines} alt="lines" className="sm25:w-[102%]"/>
      </div>

      {/* Price to Buy */}
      <div className="mb-8 relative">
        <p className="text-gray-400 mb-2">Price to Buy</p>
        <div className="relative w-full">
          <div
            ref={priceRef}
            className="absolute top-[-35px] transform -translate-x-1/2 bg-[#0E0E1A] text-white text-xs font-bold px-3 py-1 rounded-full border border-[#6C5DD3] shadow-md opacity-100 transition-opacity duration-200"
          >
            ${price.toFixed(2)}
          </div>

          <input
            type="range"
            min="0.1"
            max="10"
            step="0.1"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full appearance-none bg-transparent cursor-pointer range-slider"
            style={{
              background: `linear-gradient(to right, #4D60FF 0%, #A04DFF ${(price / 10) * 100}%, #1A1433 ${(price / 10) * 100}%)`,
            }}
          />
        </div>
      </div>

      {/* Percentage to Buy */}
      <div className="mb-10 relative">
        <p className="text-gray-400 mb-2">Percentage to Buy</p>
        <div className="relative w-full">
          <div
            ref={percentageRef}
            className="absolute top-[-35px] transform -translate-x-1/2 bg-[#0E0E1A] text-white text-xs font-bold px-3 py-1 rounded-full border border-[#6C5DD3] shadow-md opacity-100 transition-opacity duration-200"
          >
            {percentage}%
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={percentage}
            onChange={(e) => setPercentage(Number(e.target.value))}
            className="w-full appearance-none bg-transparent cursor-pointer range-slider"
            style={{
              background: `linear-gradient(to right, #4D60FF 0%, #A04DFF ${percentage}%, #1A1433 ${percentage}%)`,
            }}
          />
        </div>
        <img src={percent} alt="percent" className="sm25:w-[110%]"/>
      </div>

      {/* Set AI to Buy Button */}
      <button className="w-[175px] h-9 rounded-2xl mx-auto flex items-center justify-center bg-gradient-to-r from-[#4D60FF] to-[#A04DFF] text-white py-3 text-xs font-medium gap-2">
        <img src={bot} alt="bot" />
         Set Ai to Buy
      </button>
    </div>
    <div className="p-6 rounded-2xl shadow-md w-full max-w-md mx-auto mb-16"
    style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <h2 className="text-lg font-bold text-white mb-4">Sells Overview</h2>

      {/* Amount to Sell */}
      <div className="mb-8 relative">
        <p className="text-gray-400 mb-2">Amount to Sell</p>
        <div className="relative w-full">
          <div
            ref={sellAmountRef}
            className="absolute top-[-40px] bg-[#0E0E1A] text-white text-xs font-bold px-3 py-1 rounded-full border border-[#6C5DD3] shadow-md"
          >
            ${sellAmount.toFixed(2)}
          </div>
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={sellAmount}
            onChange={(e) => setSellAmount(Number(e.target.value))}
            className="w-full appearance-none bg-transparent cursor-pointer range-slider"
            style={{
              background: `linear-gradient(to right, #4D60FF 0%, #A04DFF ${(sellAmount / 10) * 100}%, #1A1433 ${(sellAmount / 10) * 100}%)`,
            }}
          />
        </div>
      </div>

      {/* Price to Sell */}
      <div className="mb-8 relative">
        <p className="text-gray-400 mb-2">Price to Sell</p>
        <div className="relative w-full">
          <div
            ref={sellPriceRef}
            className="absolute top-[-40px] bg-[#0E0E1A] text-white text-xs font-bold px-3 py-1 rounded-full border border-[#6C5DD3] shadow-md"
          >
            ${sellPrice.toFixed(2)}
          </div>
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={sellPrice}
            onChange={(e) => setSellPrice(Number(e.target.value))}
            className="w-full appearance-none bg-transparent cursor-pointer range-slider"
            style={{
              background: `linear-gradient(to right, #4D60FF 0%, #A04DFF ${(sellPrice / 10) * 100}%, #1A1433 ${(sellPrice / 10) * 100}%)`,
            }}
          />
        </div>
      </div>

      {/* Percentage to Sell */}
      <div className="mb-10 relative">
        <p className="text-gray-400 mb-2">Percentage to Sell</p>
        <div className="relative w-full">
          <div
            ref={sellPercentageRef}
            className="absolute top-[-40px] bg-[#0E0E1A] text-white text-xs font-bold px-3 py-1 rounded-full border border-[#6C5DD3] shadow-md"
          >
            {sellPercentage}%
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={sellPercentage}
            onChange={(e) => setSellPercentage(Number(e.target.value))}
            className="w-full appearance-none bg-transparent cursor-pointer range-slider"
            style={{
              background: `linear-gradient(to right, #4D60FF 0%, #A04DFF ${sellPercentage}%, #1A1433 ${sellPercentage}%)`,
            }}
          />
        </div>
      </div>

      {/* Set AI to Buy Button */}
      <button className="w-[175px] h-9 rounded-2xl mx-auto flex items-center justify-center bg-gradient-to-r from-[#4D60FF] to-[#A04DFF] text-white py-3 text-xs font-medium gap-2">
        <img src={bot} alt="bot" />
         Set Ai to Buy
      </button>
    </div>
      </div>
  );
};

export default SalesPage;
