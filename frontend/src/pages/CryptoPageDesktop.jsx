import Navbar from "../components/Navbar";
import Aside from '../components/Aside'
import BalanceCircle from "../components/BalanceCircle";
import FooterDesktop from "../components/FooterDesktop";
import React, { useState, useEffect } from "react";
import btcIcon from "../img/btc.png";
import xrpIcon from "../img/xrp.png";
import transfer from "../img/transfer.png";
import Trades from "../components/Trades";
import bg from "../img/bg.png";

const CryptoPageDesktop = () => {
      const [isSwapped, setIsSwapped] = useState(false);
      const [hovered, setHovered] = useState(false);
       const [sellingAmount, setSellingAmount] = useState(1);
        const [prices, setPrices] = useState({ BTCUSD: 0, XRPUSD: 0 });
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

    const [priceChanges, setPriceChanges] = useState({});
  const [priceHistory, setPriceHistory] = useState({ BTCUSD: [], XRPUSD: [] });
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/current-prices/");
        const data = await response.json();
  
        const newPrices = {};
        data.forEach(({ currency, price }) => {
          newPrices[currency] = price;
        });
        setPrices(newPrices);
        
        setPriceHistory((prevHistory) => {
          const updatedHistory = { BTCUSD: [...prevHistory.BTCUSD], XRPUSD: [...prevHistory.XRPUSD] };
  
          data.forEach(({ currency, price }) => {
            if (!updatedHistory[currency]) updatedHistory[currency] = [];
            if (updatedHistory[currency].length >= 20) updatedHistory[currency].shift();
            updatedHistory[currency].push(price);
          });
  
          return updatedHistory;
        });
  
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

    return(
        <div className="flex flex-col bg-[#07051B]">
            <div>
                <Navbar />
            </div>
            <div className="flex flex-row items-center justify-center">
                <Aside />
                <div className="w-full p-12 flex flex-row">
                <div className="w-1/3 flex flex-col items-start justify-center gap-[90px]">
                   <div className="mx-auto flex items-start justify-center">
                   <BalanceCircle />
                   </div>
                   <div className="mx-auto flex items-start justify-center">
                   <FooterDesktop />
                   </div>
                </div>
                <div className="flex flex-col w-2/3">
                     <div>
                     <div>
                            <h2 className="text-[30px] font-semibold text-white">Securely Buy and Sell Crypto</h2>
                          </div>
                    
                          <div className="flex flex-row w-full gap-7 relative mt-6">
                            {/* SELLING */}
                            <div
                              className={`p-4 w-[476px] rounded-lg transition-all duration-300 ${isSwapped ? "order-2" : "order-1"}`}
                              style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" }}
                            >
                              <p className=" text-gray-400 mb-2">SELLING</p>
                              <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                  <img src={isSwapped ? xrpIcon : btcIcon} alt="Currency" className="w-9 h-9 mr-2" />
                                  <span className="text-white  text-[20px] font-semibold">{isSwapped ? "XRP" : "BTC"}</span>
                                </div>
                                <div className="flex flex-col items-end">
                                  <input
                                    type="number"
                                    className="text-xl bg-transparent text-right w-20 text-white"
                                    value={sellingAmount}
                                    onChange={(e) => setSellingAmount(Number(e.target.value) || 0)}
                                  />
                                  <p className="text-xs text-gray-400">1 {isSwapped ? "XRP" : "BTC"} = ${prices[isSwapped ? "XRPUSD" : "BTCUSD"].toFixed(2)}</p>
                                </div>
                              </div>
                            </div>
                    
                            {/* Swap Button */}
                            <div
                              className={`w-[36px] h-[36px] bg-[#2B2058] rounded-lg absolute flex items-center justify-center top-1/2 left-[470px] -translate-y-1/2 cursor-pointer ${hovered ? "scale-125 transition-transform duration-200" : ""}`}
                              onClick={handleSwap}
                            >
                              <img src={transfer} alt="transfer" width={14} height={14} className="rotate-90"/>
                            </div>
                    
                            {/* BUYING */}
                            <div
                              className={`p-4 w-[476px]  rounded-lg transition-all duration-300 ${isSwapped ? "order-1" : "order-2"}`}
                              style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" }}
                            >
                              <p className=" text-gray-400 mb-2">BUYING</p>
                              <div className="flex justify-between items-center text-white">
                                <div className="flex items-center">
                                  <img src={isSwapped ? btcIcon : xrpIcon} alt="Currency" className="w-9 h-9 mr-2" />
                                  <span className="text-white text-[20px] font-semibold">{isSwapped ? "BTC" : "XRP"}</span>
                                </div>
                                <span className="text-xl">{getBuyingAmount().toFixed(6)}</span>
                              </div>
                            </div>
                          </div>
                     </div>
                     <div className="flex flex-col">
                     <h2 className="text-[30px] text-white font-semibold mt-6 mb-4">AI Trades</h2>
      <div>
      <Trades priceChanges={priceChanges} priceHistory={priceHistory} />
      </div>
                     </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default CryptoPageDesktop;