import React from "react";
import { NavLink } from "react-router-dom";
import home from '../img/home.svg'
import market from '../img/market.svg'
import notification from '../img/notification.svg'
import profile from '../img/profile.svg'

const navItems = [
  { name: "Home", icon: home, path: "/dashboard" },
  { name: "Market", icon: market, path: "/balance" },
  { name: "Notification", icon: notification, path: "/notification" },
  { name: "Profile", icon: profile, path: "/profile" },
];

const Aside = () => {
  return (
    <aside className="h-screen w-[250px] bg-[#07051B] text-white p-6 border-r-[#4953F780] border-r-[1px] rounded-xl">
      <nav className="flex flex-col gap-6">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className="flex items-center gap-4 text-lg text-gray-400"
          >
            <img className="w-6 h-6" src={item.icon} alt={item.name} />
            <span className={item.name === "Home" ? "text-blue-500" : ""}>
              {item.name}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Aside;
