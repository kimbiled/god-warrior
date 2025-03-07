import footerDesktop from "../img/footerDesktop.png"
import transfer from '../img/transfer.png'
import { useNavigate } from "react-router-dom"
import {useState} from 'react'

import { BsPlus } from "react-icons/bs";
import arrow from "../img/arrow.png";
const FooterDesktop = () => {

  const [isActive, setIsActive] = useState("Home")
  

    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/sales')
    }

    const handleClickHome = () => {
      navigate('/dashboard')
  }

  const handleClickNotification = () => {
    navigate('/notification')
}


const handleClickMarket = () => {
  navigate('/balance')
}
const handleClickProfile = () => {
  navigate('/profile')
}
    return (
      <div
        className="relative flex items-center justify-between"
        style={{
            backgroundImage: `url(${footerDesktop})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "440px", // Задаем ширину
            height: "150px", // Задаем высоту
          }}
      >
        <div className="flex flex-row justify-between w-full px-8 mt-8">
        <div className="absolute top-8 left-[215px] transform -translate-x-1/2 w-[64px] h-[64px] bg-gradient-to-b from-[#525AFF] to-[#0A23C3] rounded-full flex items-center justify-center shadow-lg"
        onClick={handleClick}>
       <img src={transfer} alt="transfer" className="w-6 h-6"/>
      </div>
        <div className="flex w-full justify-center items-center mt-16">

           
 <div className="flex gap-3 justify-center items-center">
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
        </div>
        </div>
      </div>
    )
}

export default FooterDesktop;
