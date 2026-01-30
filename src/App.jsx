import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import TaskHistory from "./pages/TaskHistory";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DailyTasks from "./pages/DailyTasks";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [dailyTasks, setDailyTasks] = useState([]);
  const [homeTasks, setHomeTasks] = useState([]);

  useEffect(() => {
    const savedDaily = JSON.parse(localStorage.getItem("dailyTasks"));
    const savedHome = JSON.parse(localStorage.getItem("homeTasks"));

    if (savedDaily) setDailyTasks(savedDaily);
    if (savedHome) setHomeTasks(savedHome);
  }, []);

useEffect(() => {
  localStorage.setItem("dailyTasks", JSON.stringify(dailyTasks));
}, [dailyTasks]);

useEffect(() => {
  localStorage.setItem("homeTasks", JSON.stringify(homeTasks));
}, [homeTasks]);


  return (
    <div>
      <ToastContainer />
      <div className="flex flex-col items-center sticky top-4">
      <Navbar />
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              dailyTasks={dailyTasks}
              setDailyTasks={setDailyTasks}
              homeTasks={homeTasks}
              setHomeTasks={setHomeTasks}
            />
          }
        />
        <Route
          path="/daily"
          element={
            <DailyTasks dailyTasks={dailyTasks} setDailyTasks={setDailyTasks} />
          }
        />
        <Route path="/history" element={<TaskHistory />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
