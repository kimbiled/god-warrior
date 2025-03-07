import Navbar from "../components/Navbar";
import Aside from '../components/Aside'
import React from "react";
import bg from "../img/bg.png";

const NotificationPageDesktop = () => {

    return(
        <div className="flex flex-col bg-[#07051B]">
            <div>
                <Navbar />
            </div>
            <div className="flex flex-row  justify-center">
                <Aside />
                <div className="w-full flex flex-row text-white p-12">
                <div className="flex flex-col gap-3">
    <h2 className="font-semibold text-[30px]">Last transactions</h2>
    <div className="w-[600px] p-4 rounded-lg bg-transparent flex justify-between items-center cursor-pointer border-[#262833] border-[1px] h-[96px]"
        style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}>
        <div className="flex flex-col gap-1">
            <p className="font-semibold text-[22px]">BTC</p>
            <p className="text-gray-400 text-lg">June 20, 2024 at 13:34</p>
        </div>
        <div>
            <p className="text-green-400 font-semibold text-[22px]">+$150.00</p>
        </div>
    </div>
    <div className="w-full p-4 rounded-lg bg-transparent flex justify-between items-center cursor-pointer border-[#262833] border-[1px] h-[96px]"
        style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}>
        <div className="flex flex-col gap-1">
            <p className="font-semibold text-[22px]">XTP</p>
            <p className="text-gray-400 text-lg">June 20, 2024 at 13:34</p>
        </div>
        <div>
            <p className="text-red-600 font-semibold text-[22px]">-$79.93</p>
        </div>
    </div>
</div>
            </div>
        </div>
    </div>
    )
}

export default NotificationPageDesktop;