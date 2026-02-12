import React, { useEffect, useState } from "react";
import CreateTasks from "../components/CreateTasks.jsx";
import TaskItem from "../components/TaskItem.jsx";

export default function DailyTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchDailyTasks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/daily");
        const data = await res.json();
        setTasks(data.tasks);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDailyTasks();
  }, []);

  // DAILY TASK ADDED
  const handleSubmit = async (task) => {
    const res = await fetch("http://localhost:5000/api/daily", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    setTasks([...tasks, data.data]);
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
      const res = await fetch(`http://localhost:5000/api/daily/${id}/toggle`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isCompleted: !tasks.find((t) => t._id === id).isCompleted,
        }),
      });
      const data = await res.json();
      console.log(data.message);
      
    } catch (error) {
      console.error("faild to toggle",error);
      setTasks(previousTasks); // rollback
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

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

        <div className="flex flex-col md:flex-row md:items-start md:justify-center gap-8 w-full ">
          {/* Add Task */}
          <div className="flex justify-center gap-3 mb-6 w-full">
            <CreateTasks onSubmit={handleSubmit} />
          </div>

          {/* Task List */}
          <div className="w-full flex flex-col gap-2 md:gap-4">
            {tasks.map((task) => (
              <TaskItem key={task._id} task={task}
                    onToggleComplete={handleComplete}/>
            ))}
          </div>

          {/* Empty State */}
          {tasks.length === 0 && (
            <div className="text-center text-gray-500 mt-10">
              No tasks for today 🎉
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
