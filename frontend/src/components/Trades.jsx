import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import bg from "../img/bg.png";
import btcIcon from "../img/btc.png";
import xrpIcon from "../img/xrp.png";

const generateFakeData = (startPrice, endPrice, steps) => {
  const data = [];
  const stepValue = (endPrice - startPrice) / steps;
  for (let i = 0; i <= steps; i++) {
    data.push({ index: i, price: startPrice + stepValue * i + (Math.random() - 0.5) * 500 });
  }
  return data;
};

const fakePriceHistory = {
  BTCUSD: generateFakeData(2.9, 2.3, 20),
  XRPUSD: generateFakeData(94325, 84500, 20)
};

const Trades = ({ priceChanges }) => {
  return (
    <div className="flex flex-row gap-3">
      {[{ name: "BTC", fullName: "Bitcoin", icon: btcIcon, data: fakePriceHistory.BTCUSD, change: priceChanges.BTCUSD },
        { name: "XRP", fullName: "Ripple", icon: xrpIcon, data: fakePriceHistory.XRPUSD, change: priceChanges.XRPUSD }]
        .map((coin) => (
          <div
            key={coin.name}
            className="sm20:w-[168px] sm20:h-[140px] sm25:w-[192px] sm25:h-[150px] lg:w-[320px] lg:h-[270px] flex flex-col items-center rounded-[18px] p-[14px] justify-between"
            style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" }}
          >
            <div className="flex flex-row items-center justify-between w-full">
              <div className="flex flex-row items-center gap-2">
                <img src={coin.icon} alt={coin.name} className="sm20:w-6 sm20:h-6 lg:w-[58px] lg:h-[58px]" />
                <div className="flex flex-col gap-2">
                  <p className="font-semibold sm20:text-xs sm75:text-sm lg:text-[26px] text-white">{coin.name}</p>
                  <p className="font-light text-[#C2BBDD] sm20:text-[10px] sm75:text-xs lg:text-[22px]">{coin.fullName}</p>
                </div>
              </div>
              <div className={`bg-[#FFFFFF] bg-opacity-10 rounded-[25px] sm20:w-11 sm75:w-14 lg:w-[90px] lg:h-[40px] sm20:h-[21px] flex flex-row justify-center items-center ${coin.change >= 0 ? 'text-[#00D137]' : 'text-[#D10000]'}`}>
                <p className="sm20:text-[10px] sm75:text-xs lg:text-[18px]">{coin.change >= 0 ? `▲ ${coin.change.toFixed(2)}%` : `▼ ${Math.abs(coin.change).toFixed(2)}%`}</p>
              </div>
            </div>
            <div className="w-full h-[68px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={coin.data}>
                  <XAxis dataKey="index" hide />
                  <YAxis domain={["auto", "auto"]} hide />
                  <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, "Price"]} />
                  <Line type="monotone" dataKey="price" stroke="#00D137" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Trades;
