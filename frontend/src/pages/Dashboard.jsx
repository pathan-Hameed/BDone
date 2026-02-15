import React, { useEffect, useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineCancel } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import TaskItem from "../components/TaskItem";
import { FiBarChart, FiLayers } from "react-icons/fi";

function Dashboard() {
  const [category, setCategory] = useState("Daily");
  const [status, setStatus] = useState("Completed");
  const [priority, setPriority] = useState("Medium");
  const [quote, setQoute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  // tasks
  const [tasks, setTasks] = useState([]);

  // fetching quote form external api provider
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await fetch(
          "https://api.api-ninjas.com/v2/quotes?categories=success",
          {
            headers: {
              "X-Api-Key": "u0NKPGvSSs5ZYQ1CxKCN5cX08riF2iGXbfgs2520",
            },
          },
        );
        const data = await res.json();
        setLoading(false);
        setQoute(data[0].quote);
      } catch (error) {
        console.error("failed to fetch quote", error);
      }
    };

    fetchQuote();
  });

  // fetching all tasks from db
  useEffect(() => {
    const fetchDailyTasks = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/tasks");
        const data = await res.json();
        setTasks(data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDailyTasks();
  }, []);

  return (
    <div className="min-h-screen text-[0.8rem] md:text-[1rem]">
      {/* header  */}
      <div className="relative mt-24 md:mt-16 text-center px-6">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-800 faculty text-red-600 mb-4">
          <span className="text-black faculty">TASK</span> MANAGER
        </h2>

        {/* Quote Card */}
        <p className="text-gray-600 text-xs italic">
          {loading ? "Loading quote..." : `“${quote}”`}
        </p>
      </div>

      {/* filter tasks based on category  */}
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
              <option value="Today">Today</option>
              <option value="Daily">Daily</option>
              <option value="All">All</option>
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
              <option value="Completed">Completed</option>
              <option value="Not-Completed">Not Completed</option>
            </select>
          </div>

          {/* Priority */}
          <div className="flex flex-col md:flex-row md:items-center md:gap-2 w-full md:w-auto">
            <label className="text-xs text-gray-500 mb-1 md:mb-0">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full md:w-50 px-4 py-2 rounded-xl border border-gray-200 
                 bg-gray-50 focus:outline-none focus:ring-2 
                 focus:ring-blue-400 transition"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="Hign">Hign</option>
            </select>
          </div>
        </div>

        {/* add button form */}
        <div>
          <button
            className="flex items-center gap-2 
                w-full
               bg-blue-500 hover:bg-blue-600 
               text-white font-semibold 
               px-8 py-4 rounded-2xl 
               shadow-lg hover:shadow-xl 
               transition-all duration-300 
               hover:-translate-y-1 active:scale-95"
            onClick={() => setOpen(!open)}
          >
            <IoAdd size={22} />
            ADD TASK
          </button>
        </div>
      </div>

      {/* add tasks from  */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="
        mt-10 mx-auto 
        max-w-2xl 
        bg-white shadow-xl 
        md:rounded-3xl 
        p-8 border border-gray-100
      "
          >
            <div className="w-full flex justify-end text-2xl md:text-4xl text-gray-600">
              <MdOutlineCancel onClick={() => setOpen(!open)} />
            </div>

            {/* Heading  */}
            <h3 className="text-2xl font-bold text-gray-800 mb-6 faculty text-center">
              Create New Task
            </h3>

            {/* Title */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Go to the gym"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 
                 bg-gray-50 focus:outline-none focus:ring-2 
                 focus:ring-blue-400 transition"
              />
            </div>

            {/* Description */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Description
              </label>
              <textarea
                name="desc"
                rows="4"
                placeholder="Chest day workout session..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 
                 bg-gray-50 focus:outline-none focus:ring-2 
                 focus:ring-blue-400 transition resize-none"
              />
            </div>

            {/* Date + Category + Priority Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Complete Before
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 
                   bg-gray-50 focus:outline-none focus:ring-2 
                   focus:ring-blue-400 transition"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 
                   bg-gray-50 focus:outline-none focus:ring-2 
                   focus:ring-blue-400 transition"
                >
                  <option value="Today">Today</option>
                  <option value="Daily">Daily</option>
                  <option value="All">All</option>
                </select>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 
                   bg-gray-50 focus:outline-none focus:ring-2 
                   focus:ring-blue-400 transition"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="px-6 py-3 rounded-xl border border-gray-300 
                 text-gray-600 hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-blue-500 text-white 
                 font-semibold shadow-md hover:bg-blue-600 
                 transition-all duration-300 active:scale-95"
              >
                Add Task
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* display tasks based on category  */}
      <div
        className="
          my-12 md:my-20
          mx-5 md:mx-16 lg:mx-24
          p-5 md:p-10
          rounded-lg
          columns-1 sm:columns-2 lg:columns-3 xl:columns-4
          gap-2
          space-y-4 md:space-y-2
        "
      >
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="break-inside-avoid">
              <TaskItem task={task} />
            </div>
          ))
        )}
      </div>

      {/*total tasks , completed tasks  */}
      <div className="flex flex-col md:flex-row items-center justify-around gap-4 mx-8 md:mx-24 mb-12">
        {/* total task cards  */}
        <div
          className="
            relative
            w-full 
            p-6
            rounded-2xl
            bg-white
            shadow-sm
            hover:shadow-xl
            transition-all
            duration-300
            hover:-translate-y-1
            overflow-hidden
            group
          "
        >
          {/* Subtle Background Accent */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-100 rounded-full blur-2xl opacity-50 group-hover:scale-110 transition duration-500"></div>

          {/* Content */}
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 tracking-wide uppercase">
                Total Tasks
              </p>

              <h2 className="text-4xl font-bold text-gray-800 mt-2">
                {tasks.length}
              </h2>

              <p className="text-sm text-gray-400 mt-1">
                Tasks created so far
              </p>
            </div>

            {/* Icon */}
            <div className="
              p-4 
              rounded-xl 
              bg-indigo-50 
              text-indigo-600 
              text-2xl
            ">
              <FiLayers  />
            </div>
          </div>
        </div>
        {/* total no of completed tasks */}
        <div
          className="
            relative
            w-full
            p-6
            rounded-2xl
            bg-white
            shadow-sm
            hover:shadow-xl
            transition-all
            duration-300
            hover:-translate-y-1
            overflow-hidden
            group
          "
        >
          {/* Subtle Background Accent */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-100 rounded-full blur-2xl opacity-50 group-hover:scale-110 transition duration-500"></div>

          {/* Content */}
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 tracking-wide uppercase">
                Total Completed Tasks
              </p>

              <h2 className="text-4xl font-bold text-gray-800 mt-2">
                {tasks.filter((t)=>{t.isComplete}).length}
              </h2>

              <p className="text-sm text-gray-400 mt-1">
                Tasks completed so far
              </p>
            </div>

            {/* Icon */}
            <div className="
              p-4 
              rounded-xl 
              bg-indigo-50 
              text-indigo-600 
              text-2xl
            ">
              <FiBarChart  />
            </div>
          </div>
        </div>

      </div>

      {/* activity streak  */}

    </div>
  );
}

export default Dashboard;
