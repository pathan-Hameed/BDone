import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { PiTextStrikethroughBold } from "react-icons/pi";
import TaskItem from "../components/TaskItem";

export default function Home() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(), // unique ID (important)
        title,
        desc,
        date,
        time,
        completed: false,
      },
    ]);

    setTitle("");
    setDesc("");
    setDate("");
    setTime("");
  };

  const handleStrike = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleDeleteAll = () => {
    setTasks([]);
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const total = tasks.length;

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-10 w-full md:w-[50%]">
        <h1 className="font-bold text-3xl text-cyan-900">Task Manager</h1>

        {/* FORM */}
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
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          <div className="flex gap-4">
            <input
              type="date"
              className="border rounded-md px-2 py-2 w-full"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              type="time"
              className="border rounded-md px-2 py-2 w-full"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </form>

        {/* TASK LIST */}
        <div className="p-4 w-full bg-amber-100 rounded-md">
          <div className="w-full flex items-start justify-between">
            <p className="text-sm mb-2">
              {completedCount}/{total} completed
            </p>
            <button
              className="text-sm text-blue-700 underline hover:text-blue-400 active:text-black"
              onClick={handleDeleteAll}
            >
              Clear all
            </button>
          </div>

          <ul className="flex flex-col gap-4 max-h-[40vh] overflow-y-scroll no-scrollbar mt-4">
            {[...tasks].reverse().map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onStrike={handleStrike}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
