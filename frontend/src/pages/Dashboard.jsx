import React, { useEffect, useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineCancel } from "react-icons/md";
import TaskItem from "../components/TaskItem";
import AddBttn from "../components/AddBttn";
import Header from "../components/PageHeader";
import PageHeader from "../components/PageHeader";
import AllCards from "../components/AllCards";
import TaskForm from "../components/TaskForm";

function Dashboard() {
  const [category, setCategory] = useState("Daily");
  const [status, setStatus] = useState("None");
  const [priority, setPriority] = useState("None");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  // tasks
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const query = new URLSearchParams({
        category,
        status,
        priority,
      }).toString();

      const res = await fetch(`http://localhost:5000/api/tasks?${query}`);

      const data = await res.json();
      setLoading(false)
      setTasks(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  // fetching all tasks from db
  useEffect(() => {
    fetchTasks();
  }, [category, status, priority]);

  //CREATE TASK BUTTON
  const handleAddBttn = () => {
    setEditingTask(null); // no prefill
    setOpen(!open);
  };

  // fetch request to EDIT a TASK in the db
  const handleEdit = (task) => {
    setEditingTask(task); // send selected task
    setOpen(true);
  };

  // fetch request to task COMPLETE STATUS TOGGLE
  const handleComplete = async (task) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/tasks/${task._id}/toggle`,
        {
          method: "PATCH",
        },
      );

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();

      if (data.success) {
        setTasks((prev) =>
          prev.map((t) =>
            t._id === task._id ? { ...t, isCompleted: !t.isCompleted } : t,
          ),
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // fetch request to DELETE a TASK from db
  const handleDelete = async (task) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/tasks/${task._id}/delete`,
        {
          method: "DELETE",
        },
      );

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      console.log(data.success, data.message);

      if (data.success) {
        setTasks((prev) => prev.filter((t) => t._id !== task._id));
      }
    } catch (error) {
      console.log(data.message, error);
    }
  };

  //fetch request to DELETE ALL
  const handleClearAll = async () => {
    const confirmDelete = window.confirm(
      "Are you sure? Once deleted, tasks cannot be recovered.",
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();

      if (data.success) {
        setTasks([]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen text-[0.8rem] md:text-[1rem]">
      {/* header  */}
      <PageHeader />

      {/* filter tasks based on category and add task  */}
      <div
        className="w-full 
      flex flex-col md:flex-row
      items-start justify-center md:items-center
      gap-8 md:gap-4 
      bg-none md:bg-white
      py-8 mt-12 md:mt-20 px-8 md:px-0"
      >
        {/* filter form  */}
        <div
          className="w-full md:w-auto bg-white shadow-md rounded-2xl px-5 py-5 
                flex flex-col md:flex-row 
                md:items-center md:justify-baseline 
                gap-5 border border-gray-100"
        >
          {/* Top Row (Mobile) */}
          <div className="flex items-center gap-8">
            <div className="flex items-center justify-center w-9 h-9 bg-blue-50 text-blue-500 rounded-xl">
              <IoFilterSharp size={18} />
            </div>
            <span className="text-sm font-semibold text-gray-700 md:hidden">
              Filters
            </span>
          </div>

          {/* Category */}
          <div className="flex flex-col md:flex-row md:items-center md:gap-2 w-full md:w-auto">
            <label className="text-xs text-gray-500 mb-1 md:mb-0">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full md:w-50 px-4 py-2 rounded-xl border border-gray-200 
                 bg-gray-50 focus:outline-none focus:ring-2 
                 focus:ring-blue-400 transition"
            >
              <option value="All">All</option>
              <option value="Today">Today</option>
              <option value="Daily">Daily</option>
            </select>
          </div>

          {/* Status */}
          <div className="flex flex-col md:flex-row md:items-center md:gap-2 w-full md:w-auto">
            <label className="text-xs text-gray-500 mb-1 md:mb-0">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full md:w-50 px-4 py-2 rounded-xl border border-gray-200 
                 bg-gray-50 focus:outline-none focus:ring-2 
                 focus:ring-blue-400 transition"
            >
              <option value="None">None</option>
              <option value="Not-Completed">Not Completed</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Priority */}
          <div className="flex flex-col md:flex-row md:items-center md:gap-2 w-full md:w-auto">
            <label className="text-xs text-gray-500 mb-1 md:mb-0">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full md:w-50 px-4 py-2 rounded-xl border border-gray-200 
                 bg-gray-50 focus:outline-none focus:ring-2 
                 focus:ring-blue-400 transition"
            >
              <option value="None">None</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        {/* add button to open create task */}
        <AddBttn onClick={handleAddBttn} />
      </div>

      {/* add tasks from  */}
      <TaskForm
        open={open}
        setOpen={setOpen}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
        refreshTasks={fetchTasks}
      />

      <div className="w-full flex justify-end mt-12 md:mt-24 px-8 md:px-24">
        <button
          className="border px-4 py-2 rounded-full bg-red-600 text-white text-md md:text-lg shadow-md"
          onClick={handleClearAll}
        >
          Clear All
        </button>
      </div>

      {/* display tasks based on category  */}

      {loading ? (
        <p className="text-center my-24">Loading...</p>
      ) : tasks.length === 0 ? (
        <div className="text-center text-gray-500 w-full my-24">
          <p>No tasks found. Add a new task to get started 🚀</p>
        </div>
      ) : (
        <div
          className="
          mb-12
          mx-5 md:mx-16 lg:mx-24
          p-5 md:p-10
          rounded-lg
          columns-1 sm:columns-2 lg:columns-3 xl:columns-4
          gap-2
          space-y-4 md:space-y-2
        "
        >
          {tasks.map((task) => (
            <div key={task._id} className="break-inside-avoid">
              <TaskItem
                task={task}
                onEdit={handleEdit}
                onComplete={() => handleComplete(task)}
                onDelete={() => handleDelete(task)}
              />
            </div>
          ))}
        </div>
      )}

      {/* activity streak  */}

      {/*total tasks , completed tasks  */}
      <AllCards tasks={tasks} />
    </div>
  );
}

export default Dashboard;

// update tasks background img
//check icon click logic is added
