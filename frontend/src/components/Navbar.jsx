import bell from '../img/bell.png'
import { useNavigate } from 'react-router-dom';
const Navbar = () =>{
    const navigate = useNavigate()
    const handleClickNotification = () =>{
        navigate("/notification")
    }
    return (
        <nav className="bg-[#07051B] p-4 flex justify-between items-center border-b-[#4953F780] border-b-[1px] ">
          <div>
            <h1 className="text-white text-lg font-bold">Ai Ur Crypto.Com</h1>
          </div>
                  <div className="absolute right-0 p-2 bg-gradient-to-r from-[#262833] to-[#091025] rounded-full cursor-pointer mr-6"
                  onClick={handleClickNotification}>
                    <img src={bell} alt="bell" className="w-[20px] h-[20px]" />
                  </div>
        </nav>
      );
}
export default Navbar;