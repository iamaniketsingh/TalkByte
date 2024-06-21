
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./components/Login";
import Chats from "./components/Chats";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/chats" element={<Chats />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
