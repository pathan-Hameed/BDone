import React from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import TaskHistory from "./pages/TaskHistory";
import DialyTasks from "./pages/DialyTasks";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div >
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<TaskHistory />} />
        <Route path="/daily" element={<DialyTasks />} />
      </Routes>
    </div>
  );
}


export default App;
