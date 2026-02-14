import React, { useEffect, useState } from "react";
import CreateTasks from "../components/CreateTasks.jsx";
import TaskItem from "../components/TaskItem.jsx";

export default function DailyTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDailyTasks = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/daily");
        const data = await res.json();
        setTasks(data.data || []);
      } catch (err) {
        setError("Failed to load tasks");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDailyTasks();
  }, []);

  // DAILY TASK ADDED
  const handleSubmit = async (task) => {
    try {
      const res = await fetch("http://localhost:5000/api/daily", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });

      const data = await res.json();

      setTasks((prev) => [...prev, data.data]);
    } catch (err) {
      console.error("Failed to add task", err);
    }
  };

  const handleEdit = (task) => {
    
  }

  // TOGGLE COMPLETION STATUS
  const handleComplete = async (id) => {
    const task = tasks.find((t) => t._id === id);
    const newStatus = !task.isCompleted;

    const previousTasks = [...tasks];

    setTasks((prev) =>
      prev.map((t) => (t._id === id ? { ...t, isCompleted: newStatus } : t)),
    );

    try {
      await fetch(`http://localhost:5000/api/daily/${id}/toggle`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isCompleted: newStatus }),
      });
    } catch (error) {
      console.error("Failed to toggle", error);
      setTasks(previousTasks);
    }
  };

  // DELETE TASK
  // const deleteTask = async (id) => {
  //   try {
  //     await fetch(`http://localhost:5000/api/daily/${id}`, {
  //       method: "DELETE",
  //     });

  //     setTasks((prev) => prev.filter((task) => task._id !== id));
  //   } catch (error) {
  //     console.error("Delete failed", error);
  //   }
  // };

  return (
    <div className="min-h-screen p-6">
      <div className="my-8 md:my-12">
        <div className="mb-6 md:mb-12">
          {/* Header */}
          <h1 className="text-3xl text-center font-bold text-gray-800 mb-2">
            Daily Tasks
          </h1>
          <p className="text-center">
            All your daily tasks would appear in dashboard.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:justify-center md:items-start gap-4">
          {/* Add Task */}
          <div className="flex justify-center gap-3 mb-6 h-[50%]">
            <CreateTasks onSubmit={handleSubmit} />
          </div>

          {/* Task List */}
          <div className="p-4 bg-[#f9fbff] rounded-md shadow w-full md:w-1/2">
            <div className="relative sticky top-0 mb-8">
              <p className="absolute top-0 left-0">
                <span>total Tasks:</span> {tasks.length}
              </p>
            </div>
            <ul className="flex flex-col gap-4 h-full min-h-[40vh] max-h-[60vh]  overflow-y-scroll no-scrollbar">
              {loading ? (
                <p className="text-center">Loading...</p>
              ) : error ? (
                <p className="text-center text-red-500">{error}</p>
              ) : tasks.length === 0 ? (
                <p className="text-center text-gray-500">
                  No tasks for today 🎉
                </p>
              ) : (
                tasks.map((task) => (
                  <TaskItem
                    key={task._id}
                    task={task}
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
