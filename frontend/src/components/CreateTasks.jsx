import React, { useEffect, useState } from "react";

function CreateTasks({ mode = "add", initialValues = {}, onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Today");

 const handleSubmit = (e) => {
  e.preventDefault();
  if (!title.trim()) return;

  const payload = {
    title,
    description,
    dueDate,
    priority,
  };

  onSubmit(payload);

  setTitle("");
  setDescription("");
  setDueDate("");
  setPriority("Medium");
};

  useEffect(() => {
    if (mode === "edit" && initialValues) {
      setTitle(initialValues.title || "");
      setDescription(initialValues.description || "");
      setDueDate(initialValues.dueDate || "");
      setPriority(initialValues.priority || "Medium");
    }
  }, [mode, initialValues]);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-md md:rounded-xl p-5 md:p-6 shadow-sm space-y-4"
    >
      {/* Title */}
      <input
        className="w-full text-lg font-medium border-none outline-none placeholder-gray-400"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Description */}
      <textarea
        className="w-full text-sm text-gray-600 border border-gray-200 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Add a description (optional)"
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Meta Row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Due Date */}
        <input
          type="date"
          className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        {/* Priority Pills */}
        <div className="flex gap-2">
          {["Low", "Medium", "High"].map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setPriority(level)}
              className={`px-3 py-1 text-xs font-semibold rounded-full border transition ${
                priority === level
                  ? priorityActiveStyles(level)
                  : "border-gray-300 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Action */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-5 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          {mode === "edit" ? "Update Task" : "Add Task"}
        </button>
      </div>
    </form>
  );
}

export default CreateTasks;

function priorityActiveStyles(priority) {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-700 border-red-200";
    case "Medium":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "Low":
      return "bg-blue-100 text-blue-700 border-blue-200";
    default:
      return "";
  }
}
