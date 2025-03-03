import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CryptoPage from "./pages/CryptoPage";
import SalesPage from "./pages/SellsPage";
import BalancePage from "./pages/BalancePage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import NotificationPage from "./pages/NotificationPage";

import LoginPageDesktop from "./pages/LoginPageDesktop";
import RegisterPageDesktop from "./pages/RegisterPageDesktop";
import CryptoPageDesktop from './pages/CryptoPageDesktop'
const isMobile = window.innerWidth <= 768;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={isMobile ? <LoginPage /> : <LoginPageDesktop />} />
        <Route path="/register" element={isMobile ? <RegisterPage /> : <RegisterPageDesktop />} />
        <Route path="/dashboard" element={isMobile ? <CryptoPage /> : <CryptoPageDesktop />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/balance" element={<BalancePage />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;