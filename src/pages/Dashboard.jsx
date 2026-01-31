import React, { useState } from "react";
import TaskItem from "../components/TaskItem";
import CreateTasks from "../components/CreateTasks";

function Dashboard({ tasks, setTasks }) {
  const [editingTask, setEditingTask] = useState(null);

  // ADD / UPDATE
  const handleSubmitTask = (task) => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? task : t))
      );
      setEditingTask(null);
    } else {
      setTasks((prev) => [
        { ...task, frequency: "daily" }, // dashboard = daily
        ...prev,
      ]);
    }
  };

  // TOGGLE COMPLETE
  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // DELETE
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // EDIT
  const handleOnEdit = (task) => {
    setEditingTask(task);
  };

  // CLEAR ALL
  const handleClearAll = () => {
    setTasks([]);
  }

  return (
    <div className="w-full flex justify-center px-4 py-12">
      <div className="flex flex-col gap-10 w-full ">
        <h1 className="font-bold text-3xl text-cyan-900 text-center">
          Task Manager
        </h1>

        <div className="flex flex-col md:flex-row md:items-start md:justify-center gap-8 w-full ">

        {/* FORM */}
        <CreateTasks
          mode={editingTask ? "edit" : "add"}
          initialValues={editingTask || {}}
          onSubmit={handleSubmitTask}
        />

        {/* TASK LIST */}
        <div className="p-4 bg-[#f9fbff] rounded-md shadow w-full md:w-1/2">
        <div className="mb-4 flex justify-between items-center">
          <p>{tasks.filter((t) => t.completed).length}/{tasks.length}</p>
          <button onClick={handleClearAll} className="bg-blue-100 hover:bg-blue-300 active:bg-blue-500 text-blue-700 rounded-full text-sm px-4 py-2">Clear all</button>
        </div>
          <ul className="flex flex-col gap-4  max-h-[60vh] overflow-y-scroll no-scrollbar">
            {tasks.length === 0 ? (
              <p className="text-center text-gray-400">
                No daily tasks yet
              </p>
            ) : (
              [...tasks].map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggleComplete={toggleComplete}
                  onDelete={deleteTask}
                  onEdit={handleOnEdit}
                />
              ))
            )}
          </ul>
        </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
