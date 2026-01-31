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
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedHome = JSON.parse(localStorage.getItem("tasks"));

    if (savedHome) setTasks(savedHome);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100">
      <ToastContainer />
      <div className="flex flex-col items-center sticky top-4">
        <Navbar />
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              tasks={tasks}
              setTasks={setTasks}
            />
          }
        />
        <Route
          path="/daily"
          element={
            <DailyTasks />
          }
        />
        <Route path="/history" element={<TaskHistory  tasks={tasks} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
