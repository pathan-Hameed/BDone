import React from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import TaskHistory from "./pages/TaskHistory";
import DialyTasks from "./pages/DialyTasks";

function App() {
  return (
    <div className="px-8 sm:px-[50px] md:px-[100px] lg:px-[100px] py-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<TaskHistory />} />
        <Route path="/daily" element={<DialyTasks />} />
      </Routes>
    </div>
  );
}


export default App;
