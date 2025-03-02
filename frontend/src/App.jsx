import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CryptoPage from "./pages/CryptoPage";
import SalesPage from "./pages/SellsPage";
import BalancePage from "./pages/BalancePage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import NotificationPage from "./pages/NotificationPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<CryptoPage />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/balance" element={<BalancePage />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;