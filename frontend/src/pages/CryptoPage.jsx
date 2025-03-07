import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Trades from "../components/Trades";
import { BsPlus } from "react-icons/bs";
import btcIcon from "../img/btc.png";
import xrpIcon from "../img/xrp.png";
import bell from "../img/bell.png";
import transfer from "../img/transfer.png";
import bg from "../img/bg.png";
import arrow from "../img/arrow.png";
import { useNavigate } from "react-router-dom";
import BalanceCircle from "../components/BalanceCircle";

const CryptoPage = () => {
  const navigate = useNavigate();
  const [isSwapped, setIsSwapped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [sellingAmount, setSellingAmount] = useState(1);
  const [prices, setPrices] = useState({ BTCUSD: 0, XRPUSD: 0 });

  const [priceChanges, setPriceChanges] = useState({});
const [priceHistory, setPriceHistory] = useState({ BTCUSD: [], XRPUSD: [] });
useEffect(() => {
  const fetchPrices = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/current-prices/");
      const data = await response.json();
      console.log(data);

      // Обновляем цены
      const newPrices = {};
      data.forEach(({ currency, price }) => {
        newPrices[currency] = price;
      });
      setPrices(newPrices); // <-- добавил обновление prices

      // Обновляем историю цен
      setPriceHistory((prevHistory) => {
        const updatedHistory = { ...prevHistory };
        data.forEach(({ currency, price }) => {
          if (!updatedHistory[currency]) updatedHistory[currency] = [];
          if (updatedHistory[currency].length >= 20) updatedHistory[currency].shift();
          updatedHistory[currency].push(price);
        });
        return updatedHistory;
      });

      // Обновляем процентные изменения цен
      setPriceChanges((prevChanges) => {
        const updatedChanges = {};
        data.forEach(({ currency, price }) => {
          const previousPrice = priceHistory[currency]?.slice(-1)[0] || price;
          updatedChanges[currency] = ((price - previousPrice) / previousPrice) * 100;
        });
        return updatedChanges;
      });
    } catch (error) {
      console.error("Ошибка загрузки цен:", error);
    }
  };

  fetchPrices();
  const interval = setInterval(fetchPrices, 25000);
  return () => clearInterval(interval);
}, []); 




  const handleSwap = () => {
    setHovered(true);
    setTimeout(() => {
      setIsSwapped(!isSwapped);
      setHovered(false);
    }, 200);
  };

  const getBuyingAmount = () => {
    if (!prices.BTCUSD || !prices.XRPUSD) return 0;
    return isSwapped
      ? (sellingAmount * prices.XRPUSD) / prices.BTCUSD
      : (sellingAmount * prices.BTCUSD) / prices.XRPUSD;
  };

  return (
    <div className="flex flex-col bg-transparent h-auto text-white p-4 max-w-md mx-auto pb-[120px]">
      <div className="w-full flex justify-between items-center mb-6 relative mt-16">
        <h1 className="text-[20px] font-black text-center w-full">Ai Ur Crypto.Com</h1>
        <div
          className="absolute right-0 p-2 bg-gradient-to-r from-[#262833] to-[#091025] rounded-full cursor-pointer"
          onClick={() => navigate("/notification")}
        >
          <img src={bell} alt="bell" className="w-[20px] h-[20px]" />
        </div>
      </div>

      <div className="relative flex flex-col items-center mb-6">
        <BalanceCircle />
      </div>

      <div className="flex gap-3 justify-center items-center p-4">
      {/* Add Cash */}
      <button className="flex items-center justify-center w-[100px] h-9 rounded-full border border-purple-500 text-white sm75:text-xs sm20:text-[10px] font-medium bg-transparent">
        <BsPlus size={24} />
        Add Cash
      </button>

      {/* Add Crypto */}
      <button className="flex items-center justify-center  w-[110px] h-9 rounded-full border border-purple-500 text-white sm75:text-xs sm20:text-[10px] font-medium bg-transparent">
        <BsPlus size={24} />
        Add Crypto
      </button>

      {/* Cash Out */}
      <button className="flex items-center justify-center  w-[100px] h-9 rounded-full text-white sm75:text-xs sm20:text-[10px] font-medium bg-gradient-to-l from-[#8628B6] to-[#3A79F9]">
       <img src={arrow} alt="arrow" width={15} height={15} className="mr-2"/>
        Cash Out
      </button>
    </div>

      <div>
        <h2 className="text-lg font-bold mb-4 text-left">Securely Buy and Sell Crypto</h2>
      </div>

      <div className="flex flex-col w-full gap-2 relative">
        {/* SELLING */}
        <div
          className={`p-4 w-full rounded-lg transition-all duration-300 ${isSwapped ? "order-2" : "order-1"}`}
          style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <p className="text-sm text-gray-400 mb-2">SELLING</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src={isSwapped ? xrpIcon : btcIcon} alt="Currency" className="w-6 h-6 mr-2" />
              <span>{isSwapped ? "XRP" : "BTC"}</span>
            </div>
            <div className="flex flex-col items-end">
              <input
                type="number"
                className="text-xl bg-transparent text-right w-20"
                value={sellingAmount}
                onChange={(e) => setSellingAmount(Number(e.target.value) || 0)}
              />
              <p className="text-xs text-gray-400">1 {isSwapped ? "XRP" : "BTC"} = ${prices[isSwapped ? "XRPUSD" : "BTCUSD"].toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div
          className={`w-[26px] h-[26px] bg-[#2B2058] rounded-lg absolute flex items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer ${hovered ? "scale-125 transition-transform duration-200" : ""}`}
          onClick={handleSwap}
        >
          <img src={transfer} alt="transfer" width={14} height={14} />
        </div>

        {/* BUYING */}
        <div
          className={`p-4 w-full rounded-lg transition-all duration-300 ${isSwapped ? "order-1" : "order-2"}`}
          style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <p className="text-sm text-gray-400 mb-2">BUYING</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src={isSwapped ? btcIcon : xrpIcon} alt="Currency" className="w-6 h-6 mr-2" />
              <span>{isSwapped ? "BTC" : "XRP"}</span>
            </div>
            <span className="text-xl">{getBuyingAmount().toFixed(6)}</span>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-bold mt-6 mb-4">AI Trades</h2>
      <div>
      <Trades priceChanges={priceChanges} priceHistory={priceHistory} />
      </div>

      <Footer />
    </div>
  );
};

export default CryptoPage;
