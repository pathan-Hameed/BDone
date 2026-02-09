import React, { useEffect, useState } from "react";
import TaskItem from "../components/TaskItem";
import CreateTasks from "../components/CreateTasks";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [view, setView] = useState("today"); // "today" or "all"

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const url =
          view === "today"
            ? "http://localhost:5000/api/tasks/today"
            : "http://localhost:5000/api/tasks";

        const res = await fetch(url);
        const data = await res.json();
        setTasks(data.data || data || []);
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      }
    };

    fetchTasks();
  }, [view]); // 👈 dependency

  const handleShowTodayTasks = () => setView("today");
  const handleShowAllTasks = () => setView("all");

  // HANDLE CREATE & UPDATE
  const handleSubmitTask = async (task) => {
    try {
      if (editingTask) {
        // UPDATE
        const res = await fetch(
          `http://localhost:5000/api/tasks/${editingTask._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
          },
        );

        const updatedTask = await res.json();

        setTasks((prev) =>
          prev.map((t) => (t._id === updatedTask._id ? updatedTask : t)),
        );

        setEditingTask(null);
      } else {
        // CREATE
        const res = await fetch("http://localhost:5000/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(task),
        });

        const newTask = await res.json();

        setTasks((prev) => [...prev, newTask]);
      }
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  // TOGGLE COMPLETION STATUS
  const handleComplete = async (id) => {
    const previousTasks = [...tasks];

    // optimistic update
    setTasks((prev) =>
      prev.map((task) =>
        task._id === id ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    );

    try {
      await fetch(`http://localhost:5000/api/tasks/${id}/toggle`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isCompleted: !tasks.find((t) => t._id === id).isCompleted,
        }),
      });
    } catch (error) {
      console.error(error);
      setTasks(previousTasks); // rollback
    }
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
  };

  const completedCount = tasks.filter((task) => task.isCompleted).length;
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
            <p className="mb-4 outfit text-sm">
              {completedCount}/{tasks.length} <span>Completed</span>
            </p>
            <div className="mb-4 flex justify-between items-center">
              <div className="flex gap-2 md:gap-4 items-center justify-between">
                <button
                  onClick={handleShowTodayTasks}
                  className={`flex-1 px-4 py-2 text-sm md:text-base font-medium rounded-full transition
        ${
          view === "today"
            ? "bg-blue-500 text-white shadow"
            : "text-blue-700 hover:bg-blue-100"
        }`}
                >
                  Today's 
                </button>
                <button
                  onClick={handleShowAllTasks}
                  className={`flex-1 px-4 py-2 text-sm md:text-base font-medium rounded-full transition
        ${
          view === "all"
            ? "bg-blue-500 text-white shadow"
            : "text-blue-700 hover:bg-blue-100"
        }`}
                >
                  All 
                </button>
              </div>
              <button
                onClick={handleClearAll}
                className="bg-blue-100 hover:bg-blue-300 active:bg-blue-500 text-blue-700 rounded-full text-sm px-4 py-2"
              >
                Clear all
              </button>
            </div>
            <ul className="flex flex-col gap-4 h-full min-h-[40vh] max-h-[60vh]  overflow-y-scroll no-scrollbar">
              {tasks.length === 0 ? (
                <p className="text-center text-gray-400">No daily tasks yet</p>
              ) : (
                [...tasks].map((task) => (
                  <TaskItem
                    key={task._id}
                    task={task}
                    onEdit={handleOnEdit}
                    onToggleComplete={handleComplete}
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
