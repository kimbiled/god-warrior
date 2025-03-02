import footer from "../img/footer.png"
import home from '../img/home.svg'
import market from '../img/market.svg'
import notification from '../img/notification.svg'
import profile from '../img/profile.svg'
import transfer from '../img/transfer.png'
import { useNavigate } from "react-router-dom"
import {useState} from 'react'
const FooterMenu = () => {

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
        className="fixed bottom-3 left-1/2 transform -translate-x-1/2 min-w-[320px] max-w-[425px] w-full h-[70px] bg-no-repeat bg-center bg-cover flex items-center justify-between"
        style={{
            backgroundImage: `url(${footer})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%", // Задаем ширину
            height: "100px", // Задаем высоту
          }}
      >
        <div className="flex flex-row justify-between min-w-[320px] max-w-[425px] w-full px-8 mt-8">
        <div className="absolute top-4 sm20:left-[180px] sm25:left-[204px] transform -translate-x-1/2 w-[56px] h-[56px] bg-gradient-to-b from-[#525AFF] to-[#0A23C3] rounded-full flex items-center justify-center shadow-lg"
        onClick={handleClick}>
       <img src={transfer} alt="transfer" className="w-6 h-6"/>
      </div>
      <div className="flex min-w-[320px] max-w-[425px] w-full justify-between items-center">
  {/* Home (Активный) */}
  <div className="flex flex-col items-center cursor-pointer" 
  onClick={handleClickHome}>
    <span>
      <img
        src={home}
        alt="home"
        className="w-6 h-6 transition-all duration-200"
       
      />
    </span>
    <p className="text-xs text-[#4D60FF] transition-all duration-200">Home</p>
  </div>

  {/* Market */}
  <div className="flex flex-col items-center group cursor-pointer"
  onClick={handleClickMarket}>
    <span>
      <img
        src={market}
        alt="market"
        className="w-6 h-6 transition-all duration-200 group-hover:opacity-75"
      />
    </span>
    <p className="text-xs text-gray-400 transition-all duration-200 group-hover:text-[#4D60FF]">Market</p>
  </div>

  <div className="w-[50px]"></div> {/* Отступ под центральный круг */}

  {/* Notification */}
  <div className="flex flex-col items-center group cursor-pointer"
  onClick={handleClickNotification}>
    <span>
      <img
        src={notification}
        alt="notification"
        className="w-6 h-6 transition-all duration-200 group-hover:opacity-75"
      />
    </span>
    <p className="text-xs text-gray-400 transition-all duration-200 group-hover:text-[#4D60FF]">Notification</p>
  </div>

  {/* Profile */}
  <div className="flex flex-col items-center group cursor-pointer"
  onClick={handleClickProfile}>
    <span>
      <img
        src={profile}
        alt="profile"
        className="w-6 h-6 transition-all duration-200 group-hover:opacity-75"
      />
    </span>
    <p className="text-xs text-gray-400 transition-all duration-200 group-hover:text-[#4D60FF]">Profile</p>
  </div>
</div>
        </div>
      </div>
    )
}

export default FooterMenu;
