import footerDesktop from "../img/footerMarket.png"
import transfer from '../img/transfer.png'
import { useNavigate } from "react-router-dom"
import {useState} from 'react'
import btcWhite from '../img/btcWhite.svg'

import { BsPlus } from "react-icons/bs";
import arrow from "../img/arrow.png";
const FooterMarket= () => {

  const [isActive, setIsActive] = useState("Home")
  

    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/sales')
    }

    return (
      <div
        className="relative flex items-center justify-between w-[680px] h-[215px]"
        style={{
            backgroundImage: `url(${footerDesktop})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%", // Задаем ширину
            height: "100%", // Задаем высоту
          }}
      >
        <div className="flex flex-row justify-between w-full px-8 mt-8">
        <div className="absolute top-[84px] left-[336px] transform -translate-x-1/2 w-[84px] h-[84px] bg-gradient-to-b from-[#525AFF] to-[#0A23C3] rounded-full flex items-center justify-center shadow-lg"
        onClick={handleClick}>
       <img src={transfer} alt="transfer" className="w-6 h-6"/>
      </div>
        <div className="flex w-full justify-center items-center mt-16">

           
 <div className="flex gap-3 justify-center items-center">
      <button className="w-[290px] h-14 rounded-[150px] mx-auto flex items-center justify-center bg-gradient-to-l from-[#8628B6] to-[#3A79F9] text-white py-3 text-lg font-semibold gap-2">
               Stop Trade
              </button>
              <button className="w-[290px] h-14 rounded-[150px] mx-auto flex items-center justify-center bg-[#259C3B] text-white py-3 font-semibold gap-2 text-[24px]">
               <img src={btcWhite} alt="btcWhite" width={30} height={30}/> $100,007.77
              </button>
    </div>
        </div>
        </div>
      </div>
    )
}

export default FooterMarket;
