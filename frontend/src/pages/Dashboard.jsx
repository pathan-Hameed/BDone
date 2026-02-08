import React, { useEffect, useState } from "react";
import TaskItem from "../components/TaskItem";
import CreateTasks from "../components/CreateTasks";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/tasks/today")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data || []);
      })
      .catch(console.error);
  }, []);

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

  // TOGGLE COMPLETE
  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
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
  };

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
              {/* <p className="outfit text-sm">
                {tasks.filter((t) => t.completed).length}/{tasks.length}{" "}
                <span>Completed</span>
              </p> */}
              <button
                onClick={handleClearAll}
                className="bg-blue-100 hover:bg-blue-300 active:bg-blue-500 text-blue-700 rounded-full text-sm px-4 py-2"
              >
                Clear all
              </button>
            </div>
            <ul className="flex flex-col gap-4 h-full max-h-[60vh]  overflow-y-scroll no-scrollbar">
              {tasks.length === 0 ? (
                <p className="text-center text-gray-400">No daily tasks yet</p>
              ) : (
                [...tasks].map((task) => (
                  <TaskItem key={task._id} task={task} onEdit={handleOnEdit} />
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
