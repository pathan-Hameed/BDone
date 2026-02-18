import React, { useEffect, useState } from "react";
import TaskItem from "../components/TaskItem.jsx";
import TaskForm from "../components/TaskForm.jsx";

export default function DailyTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const [open, setOpen] = useState(true);

  useEffect(() => {
    const fetchDailyTasks = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/tasks/daily");
        const data = await res.json();
        setTasks(data.data || []);2
      } catch (err) {
        setError("Failed to load tasks");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDailyTasks();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="mt-20">
        <div className="mb-12 md:mb-12">
          {/* Header */}
          <h1 className="text-3xl text-center font-bold text-gray-800 mb-2">
            Daily Tasks
          </h1>
          <p className="text-center">
            All your daily tasks would appear in dashboard.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:justify-center md:items-start gap-4 md:gap-8 md:px-24">
          {/* Add Task */}
          <div className="mb-6 h-[50%]">
            <TaskForm 
            open={open}
            mode="daily"/>
          </div>

          {/* Task List */}
          <div className="p-4 bg-[#f9fbff] rounded-md shadow w-full md:w-1/2 h-auto">
            <div className="relative sticky top-0 mb-8">
              <p className="absolute top-0 left-0">
                <span>total Tasks:</span> {tasks.length}
              </p>
            </div>
            <ul className="flex flex-col gap-4 w-full h-full min-h-[40vh] max-h-[60vh]  overflow-y-scroll no-scrollbar">
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
                  <div className="h-auto">
                    <TaskItem
                      key={task._id}
                      task={task}
                    />
                  </div>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
