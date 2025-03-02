import React, {useState} from "react";
import Footer from "../components/Footer";
import Trades from "../components/Trades";
import { BsPlus } from "react-icons/bs";
import btcIcon from "../img/btc.png"; // Путь к иконке BTC
import xrpIcon from "../img/xrp.png"; // Путь к иконке XRP
import bell from "../img/bell.png";
import transfer from "../img/transfer.png";
import bg from "../img/bg.png";
import arrow from "../img/arrow.png";
import { useNavigate } from "react-router-dom";


import BalanceCircle from "../components/BalanceCircle";
const CryptoPage = () => {

  const navigate = useNavigate()
  const handleClickNotification = () => {
    navigate('/notification')
}

  const [isSwapped, setIsSwapped] = useState(false);
  const [hovered, setHovered] = useState(false);


  const handleSwap = () => {
    setHovered(true); // Добавляем эффект клика
    setTimeout(() => {
      setIsSwapped(!isSwapped); // Меняем местами блоки
      setHovered(false); // Убираем эффект после анимации
    }, 200); // 200ms для эффекта клика
  };

  return (
    <div className="flex flex-col bg-transparent h-auto text-white p-4 max-w-md mx-auto pb-[120px]">
      <div className="w-full flex justify-between items-center mb-6 relative mt-16">
        <h1 className="text-[20px] font-black text-center w-full">Ai Ur Crypto.Com</h1>
        <div className="absolute right-0 p-2 bg-gradient-to-r from-[#262833] to-[#091025] rounded-full cursor-pointer"
        onClick={handleClickNotification}>
          <img src={bell} alt="bell" className="w-[20px] h-[20px]" />
        </div>
      </div>
      
      <div className="relative flex flex-col items-center mb-6">
        <BalanceCircle />
      </div>
      
      <div className="flex sm75:gap-4 sm20:gap-2 mb-6 mx-auto">
        <button className="flex items-center sm75:w-[100px] sm20:w-[90px] sm20:text-[10px] h-9 border border-blue-600 rounded-full text-gray-200 font-medium  sm75:text-xs p-2">
          <BsPlus className="mr-2 w-[15px] h-[15px]" /> Add Cash
        </button>
        <button className="flex items-center sm75:w-[110px] sm20:w-[100px] sm20:text-[10px] h-9 border border-blue-600 rounded-full text-gray-200 font-medium sm75:text-xs p-2">
          <BsPlus className="mr-2 w-[15px] h-[15px]" /> Add Crypto
        </button>
        <button className=" sm75:w-[100px] sm20:w-[90px] h-9 bg-gradient-to-r from-[#8628B6] to-[#3A79F9] rounded-full flex flex-row items-center sm75:text-xs sm20:text-[10px] p-2 font-medium justify-center">
          <img src={arrow} width={15} height={15} alt="arrow" />Cash Out</button>
      </div>
    
     <div>
        <h2 className="text-lg font-bold mb-4 text-left">Securely Buy and Sell Crypto</h2>
     </div>
     <div className="flex flex-col w-full gap-2 relative">
      {/* Первый блок (SELLING) */}
      <div
        className={`p-4 w-full rounded-lg transition-all duration-300 ${
          isSwapped ? "order-2" : "order-1"
        }`}
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <p className="text-sm text-gray-400 mb-2">SELLING</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src={btcIcon} alt="BTC" className="w-6 h-6 mr-2" />
            <span>BTC</span>
          </div>
          <span className="text-xl">$5,000</span>
        </div>
      </div>

      {/* Кнопка SWAP */}
      <div
        className={`w-[26px] h-[26px] bg-[#2B2058] rounded-lg absolute flex items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer ${
          hovered ? "scale-125 transition-transform duration-200" : ""
        }`}
        onClick={handleSwap}
      >
        <img src={transfer} alt="transfer" width={14} height={14} />
      </div>

      {/* Второй блок (BUYING) */}
      <div
        className={`p-4 w-full rounded-lg transition-all duration-300 ${
          isSwapped ? "order-1" : "order-2"
        }`}
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <p className="text-sm text-gray-400 mb-2">BUYING</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src={xrpIcon} alt="XRP" className="w-6 h-6 mr-2" />
            <span>XRP</span>
          </div>
          <span className="text-xl">$2,770</span>
        </div>
      </div>
    </div>
      
      <h2 className="text-lg font-bold mt-6 mb-4">AI Trades</h2>
        <div>
          <Trades />
        </div>
      
        <Footer />
      </div>
  );
};

export default CryptoPage;
