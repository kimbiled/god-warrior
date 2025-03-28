import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar"; 
import Aside from '../components/Aside';
import bg from "../img/bg.png";

const NotificationPageDesktop = () => {
    const [transactions, setTransactions] = useState([]);
    
    const savedUserId = localStorage.getItem("user_id") || sessionStorage.getItem("user_id");
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    useEffect(() => {
        const fetchTransactions = async () => {
            if (!savedUserId || !token) {
                console.error("Missing user ID or token");
                return;
            }

            try {
                const response = await fetch(`http://127.0.0.1:8000/user/${savedUserId}/transactions/`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) throw new Error("Failed to fetch transactions");

                const data = await response.json();
                setTransactions(data);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };

        fetchTransactions();
    }, [savedUserId, token]);

    return (
        <div className="flex flex-col bg-[#07051B]">
            <Navbar />
            <div className="flex flex-row justify-center">
                <Aside />
                <div className="w-full flex flex-row text-white p-12">
                    <div className="flex flex-col gap-3">
                        <h2 className="font-semibold text-[30px]">Last transactions</h2>

                        {transactions.length > 0 ? (
                            transactions.map((tx) => (
                                <div key={tx.id} 
                                    className="w-[600px] p-4 rounded-lg bg-transparent flex justify-between items-center cursor-pointer border-[#262833] border-[1px] h-[96px]"
                                    style={{
                                        backgroundImage: `url(${bg})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}>
                                    <div className="flex flex-col gap-1">
                                        <p className="font-semibold text-[22px]">{tx.currency}</p>
                                        <p className="text-gray-400 text-lg">{new Date(tx.timestamp).toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className={`${tx.amount >= 0 ? "text-green-400" : "text-red-600"} font-semibold text-[22px]`}>
                                            {tx.amount >= 0 ? `+$${tx.amount}` : `-$${Math.abs(tx.amount)}`}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400">No transactions found</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationPageDesktop;
