import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CryptoPage from "./pages/CryptoPage";
import SalesPage from "./pages/SellsPage";
import BalancePage from "./pages/BalancePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<CryptoPage />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/balance" element={<BalancePage />} />
      </Routes>
    </Router>
  );
}

export default App;