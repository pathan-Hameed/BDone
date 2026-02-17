import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineCancel } from "react-icons/md";

function TaskForm({ open, setOpen, editingTask, setEditingTask, refreshTasks }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Today",
    priority: "Low",
    dueDate: "",
  });

  // 🧠 Prefill when editing
  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || "",
        description: editingTask.description || "",
        category: editingTask.category || "Today",
        priority: editingTask.priority || "Low",
        dueDate: editingTask.dueDate?.split("T")[0] || "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        category: "Today",
        priority: "Low",
        dueDate: "",
      });
    }
  }, [editingTask]);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editingTask
        ? `http://localhost:5000/api/tasks/${editingTask._id}`
        : `http://localhost:5000/api/tasks`;

      const method = editingTask ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      console.log(data);

      setFormData({
        title: "",
        description: "",
        category: "Today",
        priority: "Low",
        dueDate: "",
      });
      setEditingTask(null);
      setOpen(false);
      refreshTasks(); // re-fetch tasks
    } catch (err) {
      console.log(err.message);
    }
  };

  //close form
  const handleClose = () => {
  setEditingTask(null);
  setOpen(false);
};

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mt-10 mx-auto max-w-2xl bg-white shadow-xl rounded-3xl p-8"
        >
          <div className="flex justify-end text-2xl text-gray-600">
            <MdOutlineCancel onClick={handleClose} />
          </div>

          <h3 className="text-2xl font-bold mb-6 text-center">
            {editingTask ? "Edit Task" : "Create New Task"}
          </h3>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full mb-4 p-3 border rounded-xl"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="descriptionription"
              className="w-full mb-4 p-3 border rounded-xl"
            />
            {/* Date + Category + Priority Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Complete Before
                </label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="w-full
                   px-4 py-3 
                   rounded-xl 
                   border border-gray-200 
                   bg-gray-50 
                   focus:outline-none focus:ring-2 focus:ring-blue-400 
                   transition"
                />
              </div>
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full 
                  px-4 py-3 
                  rounded-xl 
                  border border-gray-200 
                  bg-gray-50 
                  focus:outline-none focus:ring-2 focus:ring-blue-400 
                  transition"
                >
                  <option value="Today">Today</option>
                  <option value="Daily">Daily</option>
                </select>
              </div>
              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full 
                  px-4 py-3 
                  rounded-xl 
                  border border-gray-200 
                  bg-gray-50 
                  focus:outline-none focus:ring-2 focus:ring-blue-400 
                  transition"
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
                className="px-6 py-3 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-3 bg-blue-500 text-white rounded-xl"
              >
                {editingTask ? "Update Task" : "Add Task"}
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TaskForm;
