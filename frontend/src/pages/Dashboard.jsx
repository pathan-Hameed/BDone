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
      
    </div>
  );
}

export default Dashboard;
