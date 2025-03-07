import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BalanceCircle from "../components/BalanceCircle";
import bell from "../img/bell.png";
import arrowLeft from '../img/arrow-left.png';
import bg from "../img/bg2.png";
import bot from "../img/bot.svg";
import lines from '../img/lines.svg';
import percent from '../img/percent.svg';

const SalesPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/dashboard');
  };
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  const [amount, setAmount] = useState(2000);
  const [price, setPrice] = useState(2.0);
  const [percentage, setPercentage] = useState(100);
  const [currency, setCurrency] = useState("XRPUSD");

  const amountRef = useRef(null);
  const priceRef = useRef(null);
  const percentageRef = useRef(null);

  const updateTooltipPositions = (ref, value, min, max) => {
    if (ref.current) {
      const percent = ((value - min) / (max - min)) * 100;
      ref.current.style.left = `calc(${percent}% - 20px)`;
    }
  };

  useEffect(() => {
    updateTooltipPositions(amountRef, amount, 0, 5000);
    updateTooltipPositions(priceRef, price, 0.1, 10);
    updateTooltipPositions(percentageRef, percentage, 0, 100);
  }, [amount, price, percentage]);

  const [sellAmount, setSellAmount] = useState(5.5);
  const [sellPrice, setSellPrice] = useState(7.2);
  const [sellPercentage, setSellPercentage] = useState(50);

  const sellAmountRef = useRef(null);
  const sellPriceRef = useRef(null);
  const sellPercentageRef = useRef(null);

  useEffect(() => {
    updateTooltipPositions(sellAmountRef, sellAmount, 0, 10);
    updateTooltipPositions(sellPriceRef, sellPrice, 0, 10);
    updateTooltipPositions(sellPercentageRef, sellPercentage, 0, 100);
  }, [sellAmount, sellPrice, sellPercentage]);

  // Связь между percentage и amount
  useEffect(() => {
    const newAmount = (sellPercentage / 100) * 10; // 10 - максимальное значение для sellAmount
    setSellPrice(parseFloat(newAmount.toFixed(2))); // Ограничиваем до двух знаков после запятой
  }, [sellPercentage]);

  // Функция для отправки POST-запроса на покупку
  const handleBuy = async () => {
    const totalCost = price * amount;

    if (totalCost > balance) {
      alert("Недостаточно средств на балансе для покупки.");
      return;
    }

    const buyData = {
      currency: currency,
      price: price,
      amount: amount,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/set-buy-price/", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(buyData),
      });

      if (response.ok) {
        alert("Покупка успешно выполнена!");
      } else {
        alert("Ошибка при выполнении покупки.");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Произошла ошибка при отправке запроса.");
    }
  };

  // Функция для отправки POST-запроса на продажу
  const handleSell = async () => {
    const totalCost = sellPrice * sellAmount;

    if (totalCost > balance) {
      alert("Недостаточно средств на балансе для продажи.");
      return;
    }

    const sellData = {
      currency: currency,
      price: sellPrice,
      amount: sellAmount,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/set-sell-price/", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sellData),
      });

      if (response.ok) {
        alert("Продажа успешно выполнена!");
      } else {
        alert("Ошибка при выполнении продажи.");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Произошла ошибка при отправке запроса.");
    }
  };

  const [balance, setBalance] = useState(0);
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/user-deposit/", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBalance(data.balance);
        } else {
          console.error("Ошибка при получении баланса");
        }
      } catch (error) {
        console.error("Ошибка:", error);
      }
    };

    fetchBalance();
  }, [token]);

  // Обработчики изменений
  const handlePriceChange = (value) => {
    setPrice(value);
    setPercentage(parseFloat(((value / 10) * 100).toFixed(2))); // Ограничиваем до двух знаков после запятой
  };

  const handlePercentageChange = (value) => {
    setPercentage(value);
    setPrice(parseFloat(((value / 100) * 10).toFixed(2))); // Ограничиваем до двух знаков после запятой
  };

  const handleSellPriceChange = (value) => {
    setSellPrice(value);
    setSellPercentage(parseFloat(((value / 10) * 100).toFixed(2))); // Ограничиваем до двух знаков после запятой
  };

  const handleSellPercentageChange = (value) => {
    setSellPercentage(value);
    setSellPrice(parseFloat(((value / 100) * 10).toFixed(2))); // Ограничиваем до двух знаков после запятой
  };

  return (
    <div className="flex flex-col bg-transparent h-auto text-white p-4 max-w-md mx-auto">
      <div className="w-full flex justify-between items-center mb-6 relative mt-16 px-4">
        <div className="p-2 cursor-pointer">
          <img src={arrowLeft} alt="back" className="w-6 h-6" onClick={handleClick} />
        </div>
        <h1 className="text-[20px] font-black text-center flex-1">Ai Ur Crypto.Com</h1>
        <div className="p-2 bg-gradient-to-r from-[#262833] to-[#091025] rounded-full cursor-pointer">
          <img src={bell} alt="bell" className="w-[20px] h-[20px]" />
        </div>
      </div>

      <div className="relative flex flex-col items-center mb-10">
        <BalanceCircle />
      </div>

      {/* Выбор валюты */}
      <div
        className="p-6 rounded-2xl shadow-md w-full max-w-md mx-auto mb-6"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2 className="text-lg font-bold text-white mb-4">Выберите валюту</h2>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-2 bg-[#0E0E1A] text-white rounded-lg border border-[#6C5DD3]"
        >
          <option value="XRPUSD">XRPUSD</option>
          <option value="BTCUSD">BTCUSD</option>
        </select>
      </div>

      {/* Buying Overview */}
      <div
        className="p-6 rounded-2xl shadow-md w-full max-w-md mx-auto mb-6"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2 className="text-lg font-bold text-white mb-4">Buying Overview</h2>

        {/* Amount to Trade */}
        <div className="mb-8 relative">
          <p className="text-gray-400 mb-2">Amount to Trade</p>
          <div className="relative w-full">
            <div
              ref={amountRef}
              className="absolute top-[-35px] transform -translate-x-1/2 bg-[#0E0E1A] text-white text-xs font-bold px-3 py-1 rounded-full border border-[#6C5DD3] shadow-md"
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
          <img src={lines} alt="lines" className="w-full" />
        </div>

        {/* Price to Buy */}
        <div className="mb-8 relative">
          <p className="text-gray-400 mb-2">Price to Buy</p>
          <div className="relative w-full">
            <div
              ref={priceRef}
              className="absolute top-[-35px] transform -translate-x-1/2 bg-[#0E0E1A] text-white text-xs font-bold px-3 py-1 rounded-full border border-[#6C5DD3] shadow-md"
            >
              ${price.toFixed(2)}
            </div>
            <input
              type="range"
              min="0.1"
              max="10"
              step="0.1"
              value={price}
              onChange={(e) => handlePriceChange(Number(e.target.value))}
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
              className="absolute top-[-35px] transform -translate-x-1/2 bg-[#0E0E1A] text-white text-xs font-bold px-3 py-1 rounded-full border border-[#6C5DD3] shadow-md"
            >
              {percentage}%
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={percentage}
              onChange={(e) => handlePercentageChange(Number(e.target.value))}
              className="w-full appearance-none bg-transparent cursor-pointer range-slider"
              style={{
                background: `linear-gradient(to right, #4D60FF 0%, #A04DFF ${percentage}%, #1A1433 ${percentage}%)`,
              }}
            />
          </div>
          <img src={percent} alt="percent" className="w-full" />
        </div>

        {/* Кнопка для покупки */}
        <button
          onClick={handleBuy}
          className="w-[175px] h-9 rounded-2xl mx-auto flex items-center justify-center bg-gradient-to-r from-[#4D60FF] to-[#A04DFF] text-white py-3 text-xs font-medium gap-2"
        >
          <img src={bot} alt="bot" />
          Set AI to Buy
        </button>
      </div>

      {/* Sells Overview */}
      <div
        className="p-6 rounded-2xl shadow-md w-full max-w-md mx-auto mb-16"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
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
              onChange={(e) => handleSellPriceChange(Number(e.target.value))}
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
              onChange={(e) => handleSellPercentageChange(Number(e.target.value))}
              className="w-full appearance-none bg-transparent cursor-pointer range-slider"
              style={{
                background: `linear-gradient(to right, #4D60FF 0%, #A04DFF ${sellPercentage}%, #1A1433 ${sellPercentage}%)`,
              }}
            />
          </div>
        </div>

        {/* Кнопка для продажи */}
        <button
          onClick={handleSell}
          className="w-[175px] h-9 rounded-2xl mx-auto flex items-center justify-center bg-gradient-to-r from-[#4D60FF] to-[#A04DFF] text-white py-3 text-xs font-medium gap-2"
        >
          <img src={bot} alt="bot" />
          Set AI to Sell
        </button>
      </div>
    </div>
  );
};

export default SalesPage;