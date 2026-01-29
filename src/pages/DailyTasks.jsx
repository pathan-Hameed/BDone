import React, { useState } from "react";
import CreateTasks from "../components/CreateTasks";
import { toast } from "react-toastify";
import TaskItem from "../components/TaskItem";

function DailyTasks({ dailyTasks, setDailyTasks }) {
  const [isAdded, setIsAdded] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleSubmit = (task) => {
    setDailyTasks((prev) => [...prev, { ...task, id: Date.now() }]);
  };

  const handleComplete = (id) => {
    setDailyTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, isCompleted: !task.isCompleted }
          : task
      )
    );
  };

   const handleOnEdit = (task) => {
    setEditingTask(task);
    setIsAdded(true);
  };

  const handleDelete = (id) => {
    setDailyTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col justify-start px-4 md:px-12">

      {/* Daily tasks which will be rendered automatically daily on the home page  */}
      <div className="mt-12">
        <div className="flex items-center justify-between w-full">
          <h2 className="font-semibold text-2xl md:text-3xl text-black flex flex-col">
            Daily Tasks
            <span className="text-sm md:text-md text-gray-600">
              Total Tasks: {dailyTasks.length}
            </span>
          </h2>
          {/* ADD BUTTON  */}
          <button
            className={`text-md md:text-xl border px-4 py-2 md:px-6 md:py-2 bg-blue-600 rounded-md active:bg-blue-800 hover:bg-blue-400 outline-none font-bold text-white ${isAdded ? "hidden" : "display"}`}
            type="button"
            onClick={() => setIsAdded(!isAdded)}
          >
            ADD+
          </button>
          {/* CANCEL BUTTON  */}
          <button
            className={`text-md md:text-xl border px-4 py-2 md:px-6 md:py-2 bg-blue-600 rounded-md active:bg-blue-800 hover:bg-blue-400 outline-none text-white font-bold ${isAdded ? "display" : "hidden"}`}
            type="button"
            onClick={() => setIsAdded(!isAdded)}
          >
            X
          </button>
        </div>

        {/* Create New Task Here  */}
        {/* Toggled when clicked on ADD+  */}
        <div
          className={`mt-8 md:mt-12 z-50 ${isAdded ? "display sticky top-12 left-4" : "hidden"}`}
        >
          <CreateTasks
          mode={editingTask ? "edit" : "create"}
          initialValues={editingTask}
          onSubmit={handleSubmit}
          />

        </div>
      </div>

      {/* All created tasks would appear here  */}
      <ul className="mt-12 mb-20 flex flex-col gap-4 overflow-y-scroll no-scrollbar min-h-[60vh] max-h-[70vh]">
        {[...dailyTasks].reverse().map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={handleComplete}
            onTaskDelete={handleDelete}
            onTaskEdit={handleOnEdit}
          />
        ))}
      </ul>
    </div>
  );
}

export default DailyTasks;
