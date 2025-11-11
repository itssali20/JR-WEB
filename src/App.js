import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import { UserProvider } from "./contexts/UserContext";
import SignupScreen from "./pages/Signup";
import Profile from "./pages/Profile";
import PortfolioSection from "./pages/Portfolio";
import Contact from "./pages/Contact";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/portfolio" element={<PortfolioSection />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
