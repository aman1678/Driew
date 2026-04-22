import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar       from "./components/Navbar";
import Home         from "./pages/Home";
import DramaDetail  from "./pages/DramaDetail";
import Login        from "./pages/Login";
import Register     from "./pages/Register";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1rem" }}>
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/dramas/:id" element={<DramaDetail />} />
          <Route path="/login"      element={<Login />} />
          <Route path="/register"   element={<Register />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}