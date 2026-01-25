import React, { useState } from "react";

function CreateTasks({ onCreatingTask }) {
    
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title,
      description,
      dueDate,
      dueTime,
      isCompleted: false,
    };

    onCreatingTask(newTask); // ✅ send task immediately

    setTitle("");
    setDescription("");
    setDueDate("");
    setDueTime("");
  };

  return (
    <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex gap-4">
        <input
          className="border rounded-md px-2 py-2 w-full"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-cyan-900 text-white rounded-md"
          type="submit"
        >
          ADD
        </button>
      </div>

      <textarea
        className="border rounded-md px-2 py-2 w-full"
        placeholder="Enter Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="flex gap-4">
        <input
          type="date"
          className="border rounded-md px-2 py-2 w-full"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <input
          type="time"
          className="border rounded-md px-2 py-2 w-full"
          value={dueTime}
          onChange={(e) => setDueTime(e.target.value)}
        />
      </div>
    </form>
  );
}

export default CreateTasks;
