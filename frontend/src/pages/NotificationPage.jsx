import { useNavigate } from "react-router-dom";
import bg from "../img/bg.png";
import Footer from "../components/Footer";
const NotificationPage = () => {
    const navigate = useNavigate()
    const handleClickNotification = () =>{
        navigate('/notification')
    }
    return (
         <div className="flex flex-col bg-transparent h-auto text-white p-4 max-w-md mx-auto">
              <div className="w-full flex justify-between items-center mb-6 relative mt-16">
                <h1 className="text-[20px] font-black text-center w-full">Ai Ur Crypto.Com</h1>
              </div>

              <div className="flex flex-col gap-3 mt-8">
             <h2 className="font-semibold text-lg">Last transactions</h2>
              <div className="w-full p-2 px-4 rounded-lg bg-transparent flex justify-between items-center cursor-pointer border-[#262833] border-[1px] h-[84px]"
              style={{
                        backgroundImage: `url(${bg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}>
                    <div className="flex flex-col gap-1">
                        <p className="font-semibold ">BTC</p>
                        <p className="text-gray-400">June 20, 2024 at 13:34</p>
                    </div>
                    <div>
                        <p className="text-green-400 font-semibold">+$150.00</p>
                    </div>
              </div>
              <div className="w-full p-2 px-4 rounded-lg bg-transparent flex justify-between items-center cursor-pointer border-[#262833] border-[1px] h-[84px]"
                style={{
                    backgroundImage: `url(${bg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}>
                    <div className="flex flex-col gap-1">
                        <p className="font-semibold ">XTP</p>
                        <p className="text-gray-400">June 20, 2024 at 13:34</p>
                    </div>
                    <div>
                        <p className="text-red-600 font-semibold">-$79.93</p>
                    </div>
              </div>
              </div>
              <Footer />
        </div>
    )
}
export default NotificationPage;