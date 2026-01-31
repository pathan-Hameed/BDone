import React, { useEffect, useState } from "react";

function CreateTasks({ mode, initialValues, onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...initialValues,
      title,
      description,
      dueDate,
      dueTime,
    };

    onSubmit(payload);

    // reset
    setTitle("");
    setDescription("");
    setDueDate("");
    setDueTime("");
  };

  useEffect(() => {
    if (mode === "edit" && initialValues) {
      setTitle(initialValues.title);
      setDescription(initialValues.description);
      setDueDate(initialValues.dueDate);
      setDueTime(initialValues.dueTime);
    }
  }, [mode, initialValues]);

  return (
    <form
      className="w-full flex flex-col bg-[#f9fbff] gap-4 rounded-lg
    p-4 md:p-8 shadow-[0_8px_24px_rgba(59,130,246,0.12)]"
      onSubmit={handleSubmit}
    >
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
