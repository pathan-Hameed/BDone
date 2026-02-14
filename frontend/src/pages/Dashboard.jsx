import React, { useEffect, useState } from "react";
import TaskItem from "../components/TaskItem";
import CreateTasks from "../components/CreateTasks";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState("today");
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks("/api/tasks/today");
  }, []);

  const fetchTasks = async (endpoint) => {
    try {
      const res = await fetch(`http://localhost:5000${endpoint}`);
      const data = await res.json();
      setTasks(data.data || data || []);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };

  const handleViewChange = (type) => {
    setView(type);

    switch (type) {
      case "today":
        fetchTasks("/api/tasks/today");
        break;
      case "all":
        fetchTasks("/api/tasks");
        break;
      case "daily":
        fetchTasks("/api/daily");
        break;
      default:
        break;
    }
  };

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
    const task = tasks.find((t) => t._id === id);
    const newStatus = !task.isCompleted;

    const previousTasks = [...tasks];

    setTasks((prev) =>
      prev.map((t) => (t._id === id ? { ...t, isCompleted: newStatus } : t)),
    );

    try {
      await fetch(`http://localhost:5000/api/tasks/${id}/toggle`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isCompleted: newStatus }),
      });
    } catch (error) {
      console.error(error);
      setTasks(previousTasks);
    }
  };

  // DELETE
// const deleteTask = async (id) => {
//   const url = `http://localhost:5000/api/tasks/${id}` || `http://localhost:5000/api/daily/${id}`
//   try {
//     const res = await fetch(
//       url,
//       {
//         method: "DELETE",
//       }
//     );

//     const data = await res.json();

//     if (res.ok && data.success) {
//       console.log("SUCCESS");

//       setTasks((prev) =>
//         prev.filter((task) => task._id !== id)
//       );
//     } else {
//       console.error("Delete failed:", data.message);
//     }

//   } catch (error) {
//     console.error("Delete failed", error);
//   }
// };

  // EDIT
  const handleOnEdit = (task) => {
    setEditingTask(task);
  };

  // DELETE
  const handleDelete = () => {
    
  }

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
              <div className="flex gap-2 md:gap-4 items-center">
                {["today", "all", "daily"].map((type) => (
                  <button
                    key={type}
                    onClick={() => handleViewChange(type)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200
                      ${
                        view === type
                          ? "bg-cyan-700 text-white shadow-md scale-105"
                          : "bg-blue-100 text-blue-700 hover:bg-blue-300"
                      }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
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
                <p className="text-gray-500 text-center">
                  {" "}
                  No task here yet..{" "}
                </p>
              ) : (
                [...tasks]
                  .reverse()
                  .map((task) => (
                    <TaskItem
                      key={task._id}
                      task={task}
                      onEdit={handleOnEdit}
                      onToggleComplete={handleComplete}
                      onDelete={handleDelete}
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
