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
import SalesPageDesktop from './pages/SellsPageDesktop';
import BalancePageDesktop from "./pages/BalancePageDesktop";
import NotificationPageDesktop from "./pages/NotificationPageDesktop";
import ProfilePageDesktop from "./pages/ProfilePageDesktop";

import AdminPage from "./pages/AdminPage";

const isMobile = window.innerWidth <= 768;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={isMobile ? <LoginPage /> : <LoginPageDesktop />} />
        <Route path="/register" element={isMobile ? <RegisterPage /> : <RegisterPageDesktop />} />
        <Route path="/dashboard" element={isMobile ? <CryptoPage /> : <CryptoPageDesktop />} />
        <Route path="/sales" element={isMobile ? <SalesPage /> : <SalesPageDesktop />} />
        <Route path="/balance" element={isMobile? <BalancePage /> : <BalancePageDesktop />} />
        <Route path="/notification" element={isMobile? <NotificationPage /> : <NotificationPageDesktop />} />
        <Route path="/profile" element={isMobile? <ProfilePage /> : <ProfilePageDesktop />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;