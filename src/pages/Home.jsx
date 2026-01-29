import React, { useState } from "react";
import TaskItem from "../components/TaskItem";
import CreateTasks from "../components/CreateTasks";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);


  const handleSubmit = (task) => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? task : t))
      );
      setEditingTask(null);
    } else {
      setTasks((prev) => [...prev, { ...task, id: Date.now() }]);
    }
  };

   const handleOnEdit = (task) => {
    setEditingTask(task);
    setIsAdded(true);
  };

  const handleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, isCompleted: !task.isCompleted }
          : task
      )
    );
  };

  const handleDelete = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleClearAllTasks = () => {
    setTasks([]);
  };

  const completedTasks = tasks.filter((t) => t.isCompleted).length;
  const totalTasks = tasks.length;

  return (
    <div className="w-full h-screen flex justify-center items-start md:items-center px-4 md:px-8 py-8 md:py-4">
      
      <div className="flex flex-col items-center gap-10 w-full md:w-[50%]">
        <h1 className="font-bold text-3xl text-cyan-900">Task Manager</h1>

        {/* FORM */}
         <CreateTasks
          mode={editingTask ? "edit" : "create"}
          initialValues={editingTask}
          onSubmit={handleSubmit}
          />

        {/* TASK LIST */}
        <div className="p-4 w-full bg-amber-100 rounded-md">
          <div className="w-full flex items-start justify-between">
            <p className="text-sm mb-2">
              {completedTasks}/{totalTasks} completed
            </p>
            <button
              className="text-sm text-blue-700 underline hover:text-blue-400 active:text-black"
              onClick={handleClearAllTasks}
            >
              Clear all
            </button>
          </div>

          <ul className="flex flex-col gap-4 max-h-[40vh] overflow-y-scroll no-scrollbar mt-4">
            {[...tasks].reverse().map((task) => (
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
      </div>
    </div>
  );
}
