import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import TaskHistory from "./pages/TaskHistory";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DailyTasks from "./pages/DailyTasks";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      <ToastContainer />
      <div className="flex flex-col items-center sticky top-4 z-50">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/daily" element={<DailyTasks />} />
        <Route path="/history" element={<TaskHistory />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
