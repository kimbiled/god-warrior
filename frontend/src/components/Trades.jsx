import bg from "../img/bg.png";
import btcGraph from "../img/btc-graph.png"
import xrpGraph from "../img/xrp-graph.png"
import btcIcon from "../img/btc.png"; // Путь к иконке BTC
import xrpIcon from "../img/xrp.png"; // Путь к иконке XRP
import { useNavigate } from "react-router-dom";
const Trades = () => {
    return(
        <div className="flex flex-row gap-3">
        <div className="sm20:w-[168px] sm20:h-[140px] sm25:w-[192px] sm25:h-[150px] flex flex-col items-center rounded-[18px] p-[14px] justify-between" style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-row items-center gap-2">
            <div>
              <img src={btcIcon} alt="bitcoin" className="w-6 h-6"/>
            </div>
            <div>
              <p className="font-semibold sm20:text-xs sm75:text-sm">BTC</p>
              <p className="font-light text-[#C2BBDD] sm20:text-[10px] sm75:text-xs">Bitcoin</p>
            </div>
          </div>
          <div className="bg-[#FFFFFF] bg-opacity-10 rounded-[25px] sm20:w-11 sm75:w-14 h-[21px] flex flex-row justify-center items-center">
              <p className="sm20:text-[10px] sm75:text-xs text-[#00D137]">▲ 4.5%</p>
          </div>
          </div>
          <div>
            <img src={btcGraph} alt="btc-graph" className="sm20:w-[140px] sm20:h-[68px] sm25:w-[168px] sm25:h-[68px]"/>
          </div>
        </div>

        <div className="sm20:w-[168px] sm20:h-[140px] sm25:w-[192px] sm25:h-[150px] flex flex-col items-center rounded-[18px] p-[14px] justify-between" style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-row items-center gap-2">
            <div>
              <img src={xrpIcon} alt="bitcoin" className="w-6 h-6"/>
            </div>
            <div>
              <p className="font-semibold sm20:text-xs sm75:text-sm">XRP</p>
              <p className="font-light text-[#C2BBDD]  sm20:text-[10px] sm75:text-xs">Ripple</p>
            </div>
          </div>
          <div className="bg-[#FFFFFF] bg-opacity-10 rounded-[25px] w-14 h-[21px] flex flex-row justify-center items-center">
              <p className="sm20:text-[10px] sm75:text-xs text-[#00D137]">▲ 4.5%</p>
          </div>
          </div>
          <div>
            <img src={xrpGraph} alt="xrp-graph" className="sm20:w-[140px] sm20:h-[68px] sm25:w-[168px] sm25:h-[68px]"/>
          </div>
        </div>
      </div>
    )
}

export default Trades;