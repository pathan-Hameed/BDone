import React, { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      if (!title.trim()) {
        return;
      }

      setTasks([...tasks, title]);
      setTitle("");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-12 w-full md:w-[50%] lg:w-[50%]">
        <h1 className=".outfit font-bold text-3xl text-center text-cyan-900">
          Task Manager
        </h1>

        <form id="task-input" className="w-full" onSubmit={handleSubmit}>
          <div className="flex items-center justify-between gap-4">
            <input
              className="border border-gray-200 rounded-md px-2 py-2 w-full outline-none"
              type="text"
              name=""
              id="task-title"
              placeholder="Enter your task here..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-cyan-900 rounded-md text-white font-medium text-md"
              type="submit"
            >
              ADD
            </button>
          </div>
        </form>

        <div className="py-4 w-full">
          <ul
            id="task-list"
            className="flex flex-col-reverse items-center justify-end gap-8 list-none min-w-full min-h-[40vh] max-h-[40vh] h-[40vh] overflow-y-scroll border-none"
          >
            {tasks.map((task, index) => (
              <li
                key={index}
                className="px-2 py-4 text-xl bg-linear-to-r from-gray-100 to-cyan-200 font-semibold w-full rounded-md"
              >
                {task}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
